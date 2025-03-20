import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
    remember: vine.boolean().optional(),
  })
)

loginValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': "L'adresse email est requise.",
  'email.email': "L'adresse email n'est pas valide.",
  'password.required': 'Le mot de passe est requis.',
})
