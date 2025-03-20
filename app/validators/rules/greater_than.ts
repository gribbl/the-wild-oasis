import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

export const greaterThanRule = vine.createRule(
  (value: unknown, fieldName: string, field: FieldContext) => {
    if (typeof value !== 'number') return

    if (!field.data[fieldName]) return

    const minValue = field.data[fieldName]

    if (typeof minValue !== 'number') return

    if (value < minValue) {
      field.report(`The {{ field }} must be greater than ${fieldName}`, 'greaterThan', field)
    }
  }
)
