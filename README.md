# Prisma Type Inference with `Prisma.validator`

This example shows how to use `Prisma.validator` and the generated
types to infer the output type of Prisma Client methods.

The example code can be found in [`src/index.ts`](src/index.ts).

## How to use

1. Download example & install dependencies

Clone this repository:

```sh
git clone git@github.com:sbking/prisma-type-inference-validator.git
```

Install dependencies:

```sh
cd prisma-type-inference-validator
npm install
```

2. Copy the example `.env` file

```sh
cp .env.example .env
```

3. Start PostgreSQL with Docker Compose

Run the following command to start PostgreSQL:

```sh
docker compose up -d
```

> **Note:** You might need to first [install Docker Compose](https://docs.docker.com/compose/install/).

4. Run the `setup` script

```sh
npm run setup
```

5. Run the `start` script

```sh
npm run start
```
