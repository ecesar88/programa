import { Masker, Validator } from 'mask-validation-br'

export function validatorCPF(cpf: string) {
  if (Validator.cpf(cpf)) {
    return Masker.cpf(cpf)
  }
  throw new Error('CPF invalido')
}
