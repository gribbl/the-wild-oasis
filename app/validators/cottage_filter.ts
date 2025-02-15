import vine from '@vinejs/vine'

export const cottageFilterValidator = vine.compile(
  vine.object({
    discount: vine.enum(['all', 'with-discount', 'no-discount']).optional(),
    sortBy: vine.enum(['name', 'price', 'capacity']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
    page: vine.number().optional(),
  })
)
