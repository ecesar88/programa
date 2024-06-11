export default class EndpointsKls {
  private base = {
    clients: '/clients',
    orders: '/orders'
  }

  public clients = {
    base: this.base.clients,
    single: (id: number) => `/${this.base.clients}/${id}`
  }

  public orders = {
    base: this.base.orders,
    single: (id: number) => `/${this.base.orders}/${id}`
  }
}

export const Endpoints = new EndpointsKls()
