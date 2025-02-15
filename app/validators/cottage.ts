import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const cottageValidator = vine.compile(
  vine.object({
    name: vine.string(),
    price: vine.number().positive().min(1),
    discountPercentage: vine.number().positive(),
    capacity: vine.number(),
    description: vine.string(),
    image: vine.file({ extnames: ['jpg', 'png'] }),
  })
)

export const editCottageValidator = vine.compile(
  vine.object({
    name: vine.string(),
    price: vine.number().positive().min(1),
    discountPercentage: vine.number().positive(),
    capacity: vine.number(),
    description: vine.string(),
    image: vine.file({ extnames: ['jpg', 'png'] }).optional(),
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

cottageValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Le nom est obligatoire',
  'price.positive': 'Le prix ne peut être négatif',
  'price.min': 'Le prix ne peut être égal à 0',
  'discountPercentage.positive': 'La remise ne peut être négative',
  'description.required': 'La description est obligatoire',
  'image.required': 'Une image est requise',
})

editCottageValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Le nom est obligatoire',
  'price.positive': 'Le prix ne peut être négatif',
  'price.min': 'Le prix ne peut être égal à 0',
  'discountPercentage.positive': 'La remise ne peut être négative',
  'description.required': 'La description est obligatoire',
})
