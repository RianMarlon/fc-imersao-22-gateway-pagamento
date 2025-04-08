package domain

type AccountRepository interface {
	FindByAPIKey(apiKey string) (*Account, error)
	FindByID(id string) (*Account, error)
	Create(account *Account) error
	UpdateBalance(account *Account) error
}
