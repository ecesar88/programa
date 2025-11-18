# Kitchen Manager Backend Documentation

## Table of Contents

1. [Architecture](#architecture)
2. [Libraries Used](#libraries-used)
3. [APIs](#apis)
4. [Endpoints](#endpoints)
5. [Tools Used](#tools-used)
6. [Git Hook Scheme](#git-hook-scheme)
7. [Testing Instructions](#testing-instructions)
8. [JWT SSL Key Setup](#jwt-ssl-key-setup)

---

## Architecture

The Kitchen Manager project is built using a **GraphQL-first architecture** with Express.js as the HTTP server foundation. The application follows a modular, schema-driven design pattern.

### Core Components

#### 1. **GraphQL Layer**

- **Framework**: GraphQL Yoga (v5.15.1)
- **Schema Builder**: Pothos (v4.10.0) - Code-first GraphQL schema definition
- **Schema Location**: `src/server/graphql/schema/`
- **Schema Modules**:
  - `auth/` - Authentication and authorization
  - `healthcheck/` - System health monitoring
  - `_errors/` - Error type definitions
  - `_sharedTypes/` - Shared GraphQL types (Email, Phone)

#### 2. **Database Layer**

- **ORM**: Prisma (v6.15.0)
- **Database**: SQLite (development) / PostgreSQL (production via Docker)
- **Schema Location**: `src/prisma/schema.prisma`
- **Migrations**: `src/prisma/migrations/`

#### 3. **Authentication & Authorization**

- **JWT**: jsonwebtoken (v9.0.2) with RSA key pair (public/private)
- **Password Hashing**: bcrypt (v6.0.0)
- **RBAC**: CASL (v6.7.3) for role-based access control
- **Roles**: DEVELOPER, SUPER_ADMIN, MANAGER, USER

#### 4. **Validation**

- **Schema Validation**: Zod (v4.1.9)
- **GraphQL Validation**: @pothos/plugin-validation

#### 5. **Error Handling**

- Custom error types via Pothos error plugin
- Error handlers for:
  - Authentication errors
  - Prisma errors
  - Validation errors
  - Generic errors

#### 6. **Middleware & Plugins**

- **Security**: Helmet (v8.1.0) for HTTP headers
- **CORS**: Configured for development origins
- **Rate Limiting**: @envelop/rate-limiter
- **Logging**: Custom HTTP and GraphQL loggers
- **Request Logging**: HTTPLoggerMiddleware

#### 7. **Project Structure**

```
src/
├── bootstrap.ts              # Application entry point
├── environment/              # Environment configuration
├── constants/                # Application constants
├── prisma/                   # Database schema and migrations
├── seeds/                    # Database seed files
├── server/
│   ├── controllers/          # REST controllers
│   ├── graphql/              # GraphQL schema and resolvers
│   ├── middleware/           # Express middleware
│   ├── plugins/              # GraphQL plugins
│   ├── policies/             # RBAC policies
│   ├── routes/               # Route definitions
│   └── services/             # Business logic services
└── utils/                    # Utility functions and helpers
```

---

## Libraries Used

### Core Dependencies

#### GraphQL & API

- `graphql` (^16.11.0) - GraphQL core library
- `graphql-yoga` (5.15.1) - GraphQL server framework
- `@pothos/core` (4.10.0) - Code-first GraphQL schema builder
- `@pothos/plugin-errors` (4.7.0) - Error handling plugin
- `@pothos/plugin-scope-auth` (^4.1.6) - Authentication plugin
- `@pothos/plugin-validation` (^4.2.0) - Validation plugin
- `@pothos/plugin-tracing` (1.1.2) - Tracing plugin
- `@envelop/core` (5.3.0) - GraphQL plugin system
- `@envelop/rate-limiter` (^8.1.1) - Rate limiting plugin
- `@graphql-tools/schema` (10.0.25) - GraphQL schema utilities
- `graphql-scalars` (1.24.2) - Additional GraphQL scalar types

#### Server & HTTP

- `express` (5.1.0) - Web application framework
- `body-parser` (2.2.0) - Request body parsing
- `cors` (2.8.5) - Cross-Origin Resource Sharing
- `helmet` (8.1.0) - Security headers middleware

#### Database

- `@prisma/client` (6.15.0) - Prisma ORM client
- `prisma` (^6.16.2) - Prisma CLI

#### Authentication & Security

- `jsonwebtoken` (^9.0.2) - JWT token generation/verification
- `bcrypt` (^6.0.0) - Password hashing

#### Authorization

- `@casl/ability` (^6.7.3) - Isomorphic authorization library
- `@casl/prisma` (^1.5.2) - CASL integration with Prisma

#### Validation

- `zod` (^4.1.9) - TypeScript-first schema validation
- `zod-validation-error` (4.0.1) - Zod error formatting
- `mask-validation-br` (^2.2.5) - Brazilian document validation

#### Utilities

- `ramda` (^0.32.0) - Functional programming utilities
- `neverthrow` (^8.2.0) - Functional error handling
- `ts-pattern` (5.8.0) - Pattern matching
- `brasilapi-js` (^1.0.4) - Brazilian API integration
- `dotenv` (17.2.1) - Environment variable management
- `reflect-metadata` (0.2.2) - Metadata reflection API

#### Documentation

- `spectaql` (3.0.5) - GraphQL API documentation generator

#### Logging & Development

- `node-color-log` (13.0.3) - Colored console logging
- `figlet` (1.8.2) - ASCII art text
- `console-table-printer` (2.14.6) - Table printing
- `json-colorizer` (^3.0.1) - JSON colorization

### Development Dependencies

#### Testing

- `vitest` (^4.0.8) - Fast unit test framework
- `@faker-js/faker` (10.0.0) - Fake data generation

#### Code Quality

- `@typescript-eslint/eslint-plugin` (8.41.0) - TypeScript ESLint plugin
- `eslint` (^9.39.1) - JavaScript/TypeScript linter
- `prettier` (^3.6.2) - Code formatter

#### Git Hooks

- `@commitlint/cli` (^20.1.0) - Commit message linter
- `@commitlint/config-conventional` (^20.0.0) - Conventional commit config

#### TypeScript

- `typescript` (^5.9.2) - TypeScript compiler
- `tsx` (^4.20.6) - TypeScript execution
- `@types/node` (^24.5.1) - Node.js type definitions

---

## APIs

### GraphQL API

The primary API is **GraphQL** based, accessible at `/graphql`.

#### GraphQL Features

- **Batching**: Enabled for query batching
- **GraphiQL**: Interactive GraphQL IDE available at `/graphql`
- **Schema Introspection**: Enabled for development
- **Error Masking**: Disabled in development, enabled in production
- **Rate Limiting**: IP-based rate limiting via Envelop plugin

#### Main GraphQL Operations

##### Authentication (`auth`)

- `login` (mutation) - Authenticate user and receive JWT tokens
- `refreshToken` (mutation) - Refresh access token using refresh token
- `me` (query) - Get current authenticated user information

##### Health Check (`healthcheck`)

- Health check query for system monitoring

### REST API

Limited REST endpoints are available for system information:

#### Info Endpoints

- `GET /info/healthcheck` - Health check endpoint
- `GET /info/docs` - API documentation (SpectaQL)
- `GET /info/docs/voyager` - GraphQL Voyager visualization

---

## Endpoints

### GraphQL Endpoint

- **URL**: `http://localhost:3333/graphql` (default)
- **Method**: POST (queries/mutations), GET (GraphiQL)
- **Content-Type**: `application/json`

### REST Endpoints

| Method | Endpoint             | Description       | Authentication |
| ------ | -------------------- | ----------------- | -------------- |
| GET    | `/graphql`           | GraphiQL IDE      | None           |
| GET    | `/info/healthcheck`  | Health check      | None           |
| GET    | `/info/docs`         | API documentation | None           |
| GET    | `/info/docs/voyager` | GraphQL Voyager   | None           |

### Environment Configuration

Default server configuration:

- **Host**: Configured via `SERVER_HOSTNAME` environment variable
- **Port**: `3333` (default, configurable via `SERVER_PORT`)
- **CORS Origins**:
  - `http://localhost:5173`
  - `http://127.0.0.1:5173`
  - `null`

---

## Tools Used

### Development Tools

#### Package Manager

- **pnpm** - Fast, disk space efficient package manager

#### Build & Execution

- **tsx** - TypeScript execution without compilation
- **ts-node** - TypeScript execution for Node.js

#### Database Tools

- **Prisma Studio** - Database GUI (via `pnpm prisma studio`)
- **Prisma Migrate** - Database migration tool

#### Code Generation

- **SpectaQL** - GraphQL API documentation generator
- **Prisma Client Generator** - Type-safe database client

### DevOps Tools

#### Containerization

- **Docker** - Container platform
- **Docker Compose** - Multi-container orchestration

#### Process Management

- **Make** - Build automation (Makefile)

### Code Quality Tools

#### Linting & Formatting

- **ESLint** - JavaScript/TypeScript linter
- **Prettier** - Code formatter
- **TypeScript Compiler** - Type checking

#### Git Hooks

- **Husky** - Git hooks manager
- **Commitlint** - Commit message linter

### Testing Tools

#### Test Framework

- **Vitest** - Fast unit test framework
- **Faker.js** - Test data generation

---

## Git Hook Scheme

The project uses **Husky** for Git hooks management. Hooks are configured in the `.husky/` directory.

### Pre-commit Hook (`.husky/pre-commit`)

Runs before each commit:

1. **Commitlint**: Validates commit message format (Conventional Commits)
2. **Documentation Generation**: Updates SpectaQL documentation
3. **Stage Changes**: Automatically stages generated documentation files

```bash
# Run commitlint
npx --no-install commitlint --edit "$1"

# Update spectaql docs
pnpm run gen-docs

# Stage generated files
git add .
```

### Pre-push Hook (`.husky/pre-push`)

Runs before each push:

1. **Test Suite**: Executes all tests via `pnpm run test`
2. **Push Abort**: Aborts push if tests fail

```bash
# Run the tests
pnpm run test

# Check the exit code and abort if tests fail
if [ $? -ne 0 ]; then
  echo "Tests failed. Aborting push."
  exit 1
fi
```

### Commit Message Format

The project follows **Conventional Commits** specification:

- Format: `<type>(<scope>): <subject>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, etc.
- Example: `feat(auth): add JWT token refresh endpoint`

### Configuration Files

- **commitlint.config.js**: Commitlint configuration (extends `@commitlint/config-conventional`)
- **package.json**: Husky setup script (`"prepare": "husky"`)

---

## Testing Instructions

### Test Framework

The project uses **Vitest** for testing with a global setup configuration.

### Test Setup

1. **Global Setup**: `src/utils/tests/setup.ts`
   - Loads `.env.test` environment file
   - Runs Prisma migrations programmatically before tests

2. **Test Configuration**: `vitest.config.ts`
   - Configures global test setup
   - Uses TypeScript configuration

### Running Tests

#### Run All Tests

```bash
pnpm test
```

#### Run Tests in Watch Mode

```bash
pnpm test --watch
```

#### Run Tests with Coverage

```bash
pnpm test --coverage
```

#### Run Specific Test File

```bash
pnpm test src/server/graphql/schema/user/__tests__/resolvers.test.ts
```

### Test Structure

Tests are located alongside their corresponding modules:

```
src/server/graphql/schema/
├── auth/
│   └── __tests__/
│       └── resolvers.test.ts
├── user/
│   └── __tests__/
│       └── resolvers.test.ts
└── ...
```

### Test Utilities

#### Mock Server

- Location: `src/utils/tests/createMockServer.ts`
- Purpose: Creates a mock GraphQL server for testing

#### Test Environment

Create a `.env.test` file with test-specific environment variables:

```env
NODE_ENV=test
DATABASE_URL="file:./test.db"
AUTH_PRIVATE_KEY="<base64-encoded-private-key>"
AUTH_PUBLIC_KEY="<base64-encoded-public-key>"
SECRET_KEY="<test-secret-key>"
```

### Test Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Database state should be reset between tests
3. **Mocking**: Use mock services for external dependencies
4. **Coverage**: Aim for high test coverage on business logic

### Continuous Integration

Tests are automatically run:

- **Pre-push**: Via Git pre-push hook
- **CI/CD**: Should be configured in your CI pipeline

---

## JWT SSL Key Setup

The application uses **RSA key pairs** for JWT token signing and verification. The keys must be generated and configured as Base64-encoded strings in environment variables.

### Step 1: Generate Private Key

Generate a 4096-bit RSA private key:

```bash
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out private.pem
```

### Step 2: Generate Public Key

Extract the public key from the private key:

```bash
openssl rsa -pubout -in private.pem -out public.pem
```

### Step 3: Convert to Base64

Convert both keys to Base64 format:

#### On macOS/Linux:

```bash
# Private key
base64 -i private.pem -o private_base64.txt

# Public key
base64 -i public.pem -o public_base64.txt
```

#### On Windows (PowerShell):

```powershell
# Private key
[Convert]::ToBase64String([IO.File]::ReadAllBytes("private.pem")) | Out-File -Encoding ASCII private_base64.txt

# Public key
[Convert]::ToBase64String([IO.File]::ReadAllBytes("public.pem")) | Out-File -Encoding ASCII public_base64.txt
```

### Step 4: Configure Environment Variables

Add the Base64-encoded keys to your `.env` file:

```env
# JWT Authentication Keys (Base64-encoded)
AUTH_PRIVATE_KEY="<paste-private-key-base64-here>"
AUTH_PUBLIC_KEY="<paste-public-key-base64-here>"

# Additional required environment variables
SECRET_KEY="<your-secret-key-for-other-encryption>"
```

### Step 5: Security Best Practices

1. **Never commit keys to version control**
   - Add `private.pem`, `public.pem`, and `.env` to `.gitignore`
   - Use environment-specific `.env` files (`.env.development`, `.env.production`)

2. **Key Rotation**
   - Regularly rotate keys in production
   - Use different keys for development and production

3. **Key Storage**
   - **Development**: Store in `.env` file (not committed)
   - **Production**: Use secure secret management (AWS Secrets Manager, HashiCorp Vault, etc.)

4. **Key Permissions** (if storing as files)
   ```bash
   chmod 600 private.pem
   chmod 644 public.pem
   ```

### Environment Variables Reference

Required environment variables for JWT:

| Variable           | Description                          | Example                |
| ------------------ | ------------------------------------ | ---------------------- |
| `AUTH_PRIVATE_KEY` | Base64-encoded RSA private key       | `LS0tLS1CRUdJTi...`    |
| `AUTH_PUBLIC_KEY`  | Base64-encoded RSA public key        | `LS0tLS1CRUdJTi...`    |
| `SECRET_KEY`       | Secret key for additional encryption | `your-secret-key-here` |

### Verification

To verify your keys are correctly configured:

1. Start the application: `pnpm dev`
2. Attempt to login via GraphQL:
   ```graphql
   mutation {
     login(data: { username: "test", password: "test" }) {
       accessToken
       refreshToken
     }
   }
   ```
3. If keys are invalid, you'll receive authentication errors

### Troubleshooting

**Error: "Invalid key format"**

- Ensure keys are Base64-encoded
- Remove any newlines or whitespace from the Base64 string
- Verify the keys are complete (no truncation)

**Error: "Key too short"**

- Ensure you're using 4096-bit keys (as specified in the generation command)
- Regenerate keys if necessary

**Error: "Key mismatch"**

- Verify the public key corresponds to the private key
- Regenerate the public key from the private key if needed

---

## Additional Resources

### Database Schema

The database schema is defined on the schema.prisma file in src/prisma/schema.prisma

### Development Workflow

1. **Start Development Server**

   ```bash
   pnpm dev
   ```

2. **Run Database Migrations**

   ```bash
   pnpm migrate
   ```

3. **Generate Prisma Client**

   ```bash
   pnpm prisma generate
   ```

4. **View Database (Prisma Studio)**

   ```bash
   pnpm prisma studio
   ```

5. **Generate API Documentation**
   ```bash
   pnpm gen-docs
   ```

### Docker Development

The project includes Docker Compose configuration for containerized development:

```bash
# Build and start services
make setup

# View logs
make logs

# Run migrations
make migrate

# Stop services
make down
```

See `Makefile` for all available commands.

---

## Support

For issues, questions, or contributions, please refer to the project repository or contact the development team.
