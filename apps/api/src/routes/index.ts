abstract class ClientRoutes {
  static prefix = 'clients'

  static routes = {
    root: '/',
    withId: `/:${this.prefix}Id`
  }
}

abstract class InfoRoutes {
  static prefix = 'info'

  static routes = {
    root: '/',
    docs: `/${this.prefix}/docs`,
    healthcheck: `/${this.prefix}/healthcheck`
  }
}

export const HTTP_ROUTES = () => ({
  client: ClientRoutes,
  info: InfoRoutes
})
