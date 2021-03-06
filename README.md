# Covered Web App

The Covered website, patient dashboard, and provider dashboard.

## Prerequisites

* [npm](https://www.npmjs.com/get-npm)
* [PostgreSQL](https://www.postgresql.org/download/)

## Building

Run the following command to build and bundle frontend files:

```bash
npm run build
```

## Testing Locally

### DO NOT PUSH THESE CHANGES

You can tell git not to update these files in case you accidentally commit them
by running the following commands:

```bash
git update-index --assume-unchanged src/main/resources/application.properties
git update-index --assume-unchanged webpack.config.js
```

You can undo this change by running the following commands:

```bash
git update-index --no-assume-unchanged src/main/resources/application.properties
git update-index --no-assume-unchanged webpack.config.js
```

You can list all files that are `assume-unchanged` with the following command:

```bash
git ls-files -v|grep '^h'
```

### `src/main/resources/application.properties`

Replace `spring.datasource.url=${JDBC_DATABASE_URL}` with the following:

```properties
# spring.datasource.url=${JDBC_DATABASE_URL}
spring.datasource.url=jdbc:postgresql://ec2-54-146-4-66.compute-1.amazonaws.com:5432/d2ikjtgh8dmhpd?sslmode=require
spring.datasource.username=sdevjztcjkcuxu
spring.datasource.password=f160f3eaa24957c7dba158a61dbc68411b146823846d32a15defe63990ac82ee
```

### `webpack.config.js`

Add `watch: true,` under `mode: 'development',`.
