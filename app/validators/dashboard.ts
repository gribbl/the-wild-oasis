import vine from '@vinejs/vine'

export const dashboardFilterValidator = vine.compile(
  vine.object({
    period: vine.enum(['last-7-days', 'last-30-days', 'last-90-days', 'last-180-days']).optional(),
  })
)
