First:
`npm install`

Make a prisma database (or migrate a SQL database or whatever) to prisma:
Database name should be `smallbot`

Make a `.env` of the DATABASE_URL.
Example:
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://<sqlUser>:<sqlPassword>@<host>/smallbot"
```

For Local Environment:
`npm run dev`

To Build:
`npm run build`

To Test:
`npm run test`

To prettier format everything:
`npm run prettier-format`

To run prettier only on staged items:
`npm run pretty-quick`
