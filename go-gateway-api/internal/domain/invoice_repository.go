package domain

type InvoiceRepository interface {
	FindByAccountID(accountID string) ([]*Invoice, error)
	FindByID(id string) (*Invoice, error)
	Create(invoice *Invoice) error
	UpdateStatus(invoice *Invoice) error
}
