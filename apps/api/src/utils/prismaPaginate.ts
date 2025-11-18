import { QTY_PER_PAGE } from '../constants'

export const prismaPaginate = (pageNumber?: number | null) => {
  return {
    ...(pageNumber && pageNumber > 0
      ? {
          skip: pageNumber === 1 ? 0 : (pageNumber - 1) * QTY_PER_PAGE
        }
      : {}),
    take: QTY_PER_PAGE
  }
}
