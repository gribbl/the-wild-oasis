import vine from '@vinejs/vine'

export const cottageValidator = vine.compile(
  vine.object({
    name: vine.string(),
    price: vine.number(),
    discountPercentage: vine.number(),
    capacity: vine.number(),
    description: vine.string(),
    image: vine.file({ extnames: ['jpg', 'png'] }),
  })
)

export const cottageFilterValidator = vine.compile(
  vine.object({
    discount: vine.enum(['all', 'with-discount', 'no-discount']).optional(),
    sortBy: vine.enum(['name', 'price', 'capacity']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
    page: vine.number().optional(),
  })
)
