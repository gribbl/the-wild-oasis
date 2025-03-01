import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const cabinValidator = vine.compile(
  vine.object({
    name: vine.string(),
    price: vine.number().positive().min(1),
    discount: vine.number().positive(),
    capacity: vine.number(),
    description: vine.string(),
    image: vine.file({ extnames: ['jpg', 'png'] }),
  })
)

export const editCabinValidator = vine.compile(
  vine.object({
    name: vine.string(),
    price: vine.number().positive().min(1),
    discount: vine.number().positive(),
    capacity: vine.number(),
    description: vine.string(),
    image: vine.file({ extnames: ['jpg', 'png'] }).optional(),
  })
)

export const cabinFilterValidator = vine.compile(
  vine.object({
    discountFilter: vine.enum(['all', 'with-discount', 'no-discount']).optional(),
    sortBy: vine.enum(['name', 'price', 'capacity']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
    page: vine.number().optional(),
  })
)

cabinValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Le nom est obligatoire',
  'price.positive': 'Le prix ne peut être négatif',
  'price.min': 'Le prix ne peut être égal à 0',
  'discount.positive': 'La remise ne peut être négative',
  'description.required': 'La description est obligatoire',
  'image.required': 'Une image est requise',
})

editCabinValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Le nom est obligatoire',
  'price.positive': 'Le prix ne peut être négatif',
  'price.min': 'Le prix ne peut être égal à 0',
  'discount.positive': 'La remise ne peut être négative',
  'description.required': 'La description est obligatoire',
})
