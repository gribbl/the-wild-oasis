import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const updateNameValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail().exists({ table: 'users', column: 'email' }),
    fullname: vine.string(),
  })
)

updateNameValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': "L'adresse email est requise.",
  'email.email': "L'adresse email n'est pas valide.",
  'email.database.exists': "L'adresse email n'existe pas.",
  'fullname.required': 'Le nom est requis.',
})

export const updatePasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string(),
    password: vine.string().minLength(8).confirmed({ confirmationField: 'passwordConfirm' }),
  })
)

updatePasswordValidator.messagesProvider = new SimpleMessagesProvider({
  'currentPassword.required': "L'ancien mot de passe est requis.",
  'password.required': 'Le nouveau mot de passe est requis.',
  'password.minLength': 'Le nouveau mot de passe doit faire au moins 8 caractères.',
  'password.confirmed': 'Les mots de passe ne correspondent pas.',
})
