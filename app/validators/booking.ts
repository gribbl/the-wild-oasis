import vine from '@vinejs/vine'

export const bookingFilterValidator = vine.compile(
  vine.object({
    status: vine.enum(['all', 'checked-in', 'checked-out', 'unconfirmed']).optional(),
    sortBy: vine.enum(['date', 'cabin', 'guest']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
    page: vine.number().optional(),
  })
)

export const bookingPatchStatusValidator = vine.compile(
  vine.object({
    status: vine.enum(['checked-in', 'checked-out', 'unconfirmed']),
  })
)
