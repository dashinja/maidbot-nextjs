### Local Development
First:
`npm install`

Make a prisma database (or migrate a SQL database or whatever) to prisma:
Database name should be `smallbot`

Make a `.env` of the DATABASE_URL

Example:

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://<sqlUser>:<sqlPassword>@<host>/smallbot"
```

<br/>

Once procuring a proper DATABASE_URL:
This is a required step before running the dev script.
`pnpm prisma generate`

For Local Environment:
`pnpm run dev`

To Build:
`pnpm run build`

To Test:
`pnpm run test`

<br />

### Utility Scripts
To prettier format everything:
`pnpm run prettier-format`

To run prettier only on staged items:
`pnpm run pretty-quick`
