package server

import (
	"net/http"

	"github.com/RianMarlon/fc-imersao-22-gateway-pagamento/internal/service"
	"github.com/RianMarlon/fc-imersao-22-gateway-pagamento/internal/web/handlers"
	"github.com/RianMarlon/fc-imersao-22-gateway-pagamento/internal/web/middleware"
	"github.com/go-chi/chi/v5"
)

type Server struct {
	router         *chi.Mux
	server         *http.Server
	accountService *service.AccountService
	invoiceService *service.InvoiceService
	port           string
}

func NewServer(accountService *service.AccountService, invoiceService *service.InvoiceService, port string) *Server {
	return &Server{
		router:         chi.NewRouter(),
		accountService: accountService,
		invoiceService: invoiceService,
		port:           port,
	}
}

func (s *Server) ConfigureRoutes() {
	accountHandler := handlers.NewAccountHandler(s.accountService)
	authMiddleware := middleware.NewAuthMiddleware(s.accountService)

	s.router.Get("/accounts", accountHandler.Get)
	s.router.Post("/accounts", accountHandler.Create)

	invoiceHandler := handlers.NewInvoiceHandler(s.invoiceService)
	s.router.Group(func(r chi.Router) {
		r.Use(authMiddleware.Authenticate)
		r.Get("/invoices", invoiceHandler.ListByAccount)
		r.Get("/invoices/{id}", invoiceHandler.GetByID)
		r.Post("/invoices", invoiceHandler.Create)
	})
}

func (s *Server) Start() error {
	s.server = &http.Server{
		Addr:    ":" + s.port,
		Handler: s.router,
	}

	return s.server.ListenAndServe()
}
