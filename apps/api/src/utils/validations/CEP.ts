/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import api from 'brasilapi-js'
import { Validator, Masker } from 'mask-validation-br'

export function validatorCEP(cep: string) {
  if (Validator.cep(cep)) {
    return searchCEP(cep)
  }
  throw new Error('CEP inválido')
}

export async function searchCEP(cep: string) {
  const response = await api.cep.getBy(cep)
  return response.data
}

//CEP("28051250")

export function maskCEP(cep: string) {
  return Masker.cep(cep)
}
