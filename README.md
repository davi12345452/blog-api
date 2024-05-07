# BLOG NestJS API

## Description

<p>
This is a blog application. I had previously created a similar project in Express with EJS, but here I aimed to incorporate more backend development concepts. It's a REST API that features three main services: Category, Article, and User. There's also a specific service dedicated solely to user JWT authentication. A user can be created, updated (including the password), and deleted. There are two types of users: ADMIN and COMMON. Anyone (without authentication) can access article and category information. Articles can only be created by users (at least COMMON level); editing and deleting articles can only be done by the article owners or by an ADMIN user. Category manipulation (creation, update, and deletion) can only be done by ADMIN users. Only admin users can access information about other users.
</p>

## Installation

<p>
You must have Docker and Nest/CLI installed on your computer. Also, make sure to 
create the .env and docker-compose.yml files in your project folder.
</p>

```bash
# Clone the repository
$ git clone https://github.com/davi12345452/question-answer-api.git

# Installing project dependencies
$ npm install

# Creating a container for the PostgreSQL database
$ docker compose up -d

# Applying migrations to the database
$ npx prisma migrate deploy
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
