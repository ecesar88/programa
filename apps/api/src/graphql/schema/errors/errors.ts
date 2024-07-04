export class RecordNotFoundError extends Error {
  constructor(recordName?: string) {
    super(`${recordName} was not found or does not exist.`)

    this.name = 'RecordNotFoundError'
  }
}
