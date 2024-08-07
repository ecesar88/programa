class ClientRoutes {
  static prefix = 'clients'

  static routes = {
    root: '/',
    withId: `/:${this.prefix}Id`
  }
}

class InfoRoutes {
  static prefix = 'info'

  static routes = {
    root: '/',
    docs: `/${this.prefix}/docs`,
    healthcheck: `/${this.prefix}/healthcheck`
  }
}

export const HTTP_ROUTES = {
  client: new ClientRoutes(),
  info: new InfoRoutes()
}
