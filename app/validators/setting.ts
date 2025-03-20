import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { greaterThanRule } from './rules/greater_than.js'

export const updateSettingValidator = vine.compile(
  vine.object({
    minBookingLength: vine.number().min(2),
    maxBookingLength: vine.number().max(30).use(greaterThanRule('minBookingLength')),
    breakfastPrice: vine.number().min(1),
  })
)

updateSettingValidator.messagesProvider = new SimpleMessagesProvider({
  'minBookingLength.required': 'La durée minimale du séjour est requise',
  'minBookingLength.min': "La durée minimale du séjour doit être d'au moins {{min}} nuit(s)",
  'maxBookingLength.required': 'La durée maximale du séjour est requise',
  'maxBookingLength.max': 'La durée maximale du séjour ne peut pas dépasser {{max}} nuits.',
  'maxBookingLength.greaterThan':
    'La durée maximale du séjour doit être supérieure ou égale à la durée minimale.',
  'breakfastPrice.required': 'Le prix du petit-déjeuner est requis',
  'breakfastPrice.min': 'Le prix du petit-déjeuner doit être au moins de {{min}} €.',
})
