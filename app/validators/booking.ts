import vine from '@vinejs/vine'

export const bookingFilterValidator = vine.compile(
  vine.object({
    status: vine.enum(['all', 'checked-in', 'checked-out', 'unconfirmed']).optional(),
    sortBy: vine.enum(['date', 'cottage', 'guest']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
    page: vine.number().optional(),
  })
)
