package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/RianMarlon/fc-imersao-22-gateway-pagamento/internal/repository"
	"github.com/RianMarlon/fc-imersao-22-gateway-pagamento/internal/service"
	"github.com/RianMarlon/fc-imersao-22-gateway-pagamento/internal/web/server"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", "postgres"),
		getEnv("DB_NAME", "gateway_pagamento"),
		getEnv("DB_SSL_MODE", "disable"),
	)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to database: ", err)
	}

	defer db.Close()

	// Configura e inicializa o Kafka
	baseKafkaConfig := service.NewKafkaConfig()

	// Configura e inicializa o produtor Kafka
	producerTopic := getEnv("KAFKA_PRODUCER_TOPIC", "pending_transactions")
	producerConfig := baseKafkaConfig.WithTopic(producerTopic)
	kafkaProducer := service.NewKafkaProducer(producerConfig)
	defer kafkaProducer.Close()

	// Inicializa camadas da aplicação (repository -> service -> server)
	accountRepository := repository.NewAccountRepository(db)
	accountService := service.NewAccountService(accountRepository)

	invoiceRepository := repository.NewInvoiceRepository(db)
	invoiceService := service.NewInvoiceService(invoiceRepository, *accountService, kafkaProducer)

	// Configura e inicializa o consumidor Kafka
	consumerTopic := getEnv("KAFKA_CONSUMER_TOPIC", "transaction_results")
	consumerConfig := baseKafkaConfig.WithTopic(consumerTopic)
	groupID := getEnv("KAFKA_CONSUMER_GROUP_ID", "gateway-group")
	kafkaConsumer := service.NewKafkaConsumer(consumerConfig, groupID, invoiceService)
	defer kafkaConsumer.Close()

	// Inicia o consumidor Kafka em uma goroutine
	go func() {
		if err := kafkaConsumer.Consume(context.Background()); err != nil {
			log.Printf("Error consuming kafka messages: %v", err)
		}
	}()

	// Configura e inicia o servidor HTTP
	port := getEnv("HTTP_PORT", "8080")
	srv := server.NewServer(accountService, invoiceService, port)
	srv.ConfigureRoutes()

	if err := srv.Start(); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
