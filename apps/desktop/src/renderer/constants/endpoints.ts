export default class EndpointsKls {
  private base = {
    clients: '/clients'
  }

  public clients = {
    base: this.base.clients,
    single: (id: number) => `/${this.base.clients}/${id}`
  }
}

export const Endpoints = new EndpointsKls()
