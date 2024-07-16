class ClientRoutes {
  static prefix = 'client'

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

const HTTP_ROUTES = {
  client: ClientRoutes,
  info: InfoRoutes
}

export default HTTP_ROUTES
