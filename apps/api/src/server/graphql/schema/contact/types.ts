import type { Prisma } from '@prisma/client'
import z from 'zod'
import { builder } from '../../builder'
import { Email, EmailCreateInput } from '../_sharedTypes/email'
import { Phone, PhoneCreateInput } from '../_sharedTypes/phone'
import { Address, AddressCreateInput } from '../address/types'

/* --- Interface Definitions --- */

type TypeContact = Prisma.ContactGetPayload<{
  include: {
    address: true
    email: true
    phone: true
  }
}>

/* --- Object Definitions --- */

export const ContactRef = builder.objectRef<TypeContact>('Contact')
export const Contact = ContactRef.implement({
  description: 'Contact entry',
  fields: (t) => ({
    id: t.exposeString('id'),
    email: t.field({
      type: [Email],
      resolve: (f) => f.email
    }),
    phone: t.field({
      type: [Phone],
      resolve: (f) => f.phone
    }),
    address: t.field({
      type: [Address],
      resolve: (f) => f.address
    })
  })
})

/* --- Input Definitions --- */

export const ContactCreateInput = builder.inputType('ContactCreateInput', {
  fields: (t) => ({
    email: t.field({
      type: [EmailCreateInput],
      required: false
    }),
    phone: t.field({
      type: [PhoneCreateInput],
      required: false
    }),
    address: t.field({
      type: [AddressCreateInput],
      required: false
    })
  })
})

export const ContactUpdateInput = builder.inputType('ContactUpdateInput', {
  fields: (t) => ({
    id: t.string().validate(z.uuid()),
    data: t.field({
      type: ContactCreateInput
    })
  })
})
