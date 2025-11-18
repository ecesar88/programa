/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import api from 'brasilapi-js'
import { Masker, Validator } from 'mask-validation-br'

export function validatorCNPJ(cnpj: string) {
  if (Validator.cnpj(cnpj)) {
    const result = obterInfoCNPJ(cnpj)
    return result
  }

  throw new Error('CNPJ inválido')
}

export async function obterInfoCNPJ(cnpj: string) {
  const response = await api.cnpj.getBy(cnpj)
  const data = response.data

  const empresa = {
    nome: data.razao_social,
    nome_fantasia: data.nome_fantasia,
    telefone: data.ddd_telefone_1,
    telefone2: data.ddd_telefone_2,
    situacao: data.descricao_situacao_cadastral,
    codigo_matriz: data.identificador_matriz_filial,
    endereco: {
      logadouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      cep: data.cep,
      municipio: data.municipio,
      uf: data.uf
    }
  }
}

//CPNJTeste("00360305000104")
//CPNJTeste("26549678000111")

export function maskCNPJ(cnpj: string) {
  return Masker.cnpj(cnpj)
}
