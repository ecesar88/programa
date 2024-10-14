# Kitchen Manager Software
### This software is initially designed (it can change in the future) to help manage restaurants, cafeterias, coffee shops, and similar establishments.
This is very early stage, so changes *will* be constant

## Dependencies:
This is a monorepo managed by [TurboRepo](https://turbo.build/repo).
This project uses [GraphQL](https://graphql.org/).
This project uses [*pnpm*](https://pnpm.io/)
This project uses [SQLite](https://www.sqlite.org/) for the time being. However, I'm not sure just yet about this, may change it to PostgreSQL in the future, idk.

### On the Frontend:
- [Electron](https://www.electronjs.org/)
- [Electron-Vite](https://electron-vite.org/)
- [Jotai](https://jotai.org/) (state management)
- [Tanstack Query](https://tanstack.com/query/v3)
- [BlueprintJS](https://blueprintjs.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://axios-http.com)
- [TailwindCSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com/en/main)
- [i18next](https://react.i18next.com/)
- [RemedaJS](https://remedajs.com/)
- [Zod](https://zod.dev/)
- [optics-ts](https://github.com/akheron/optics-ts)
- [ts-pattern](https://github.com/gvergnaud/ts-pattern)
- [tinycolor2](https://www.npmjs.com/package/tinycolor2)

These are the main libs, the other ones are mostly dependencies of the libs above.

### On the Backend:
The backend is a custom Express/GraphQL API.
- [PothosGraphQL](https://pothos-graphql.dev/)
- [ExpressJS](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [tsyringe](https://github.com/microsoft/tsyringe) (providing a Prisma instance to resolvers)
- [SpectaQL](https://github.com/anvilco/spectaql) (automatically generate documentation with a single command)

## Setup
- Install dependencies:
> ```pnpm install```

- Run migrations and seeds:
> CD into the ```api``` folder under */apps/api*

> Run ```pnpm dlx prisma migrate dev```

> Execute the seed command: ```pnpm dlx prisma db seed```

On the frontend you should be good to go, there's not much needed to setup there.

## Running the project:
To run the project you have two options:
1. Run the whole project at once using [TurboRepo](https://turbo.build/repo/docs):
> From the monorepo root folder (where you see the folders ```apps```, ```packages``` and the file ```.editorconfig```), run ```pnpm run dev```. TurboRepo should start both the backend and the frontend at the same time in develop mode.

2. Run the apps separately:
> You can use ```pnpm run dev:api``` and ```pnpm run dev:ui``` to run the backend and frontend respectively on standalone mode
