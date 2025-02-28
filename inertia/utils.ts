export function formatCurrency(amount: number, currency: string = 'EUR', locale: string = 'fr-FR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
