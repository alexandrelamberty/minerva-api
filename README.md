[![Build](https://github.com/alexandrelamberty/minerva-api/actions/workflows/node.yaml/badge.svg)](https://github.com/alexandrelamberty/minerva-api/actions/workflows/node.yaml)
[![DockerHub](https://github.com/alexandrelamberty/minerva-api/actions/workflows/docker.yml/badge.svg)](https://github.com/alexandrelamberty/minerva-api/actions/workflows/docker.yml)
[![Linting](https://github.com/alexandrelamberty/minerva-api/actions/workflows/eslint.yaml/badge.svg)](https://github.com/alexandrelamberty/minerva-api/actions/workflows/eslint.yaml)
[![Formatting](https://github.com/alexandrelamberty/minerva-api/actions/workflows/prettier.yaml/badge.svg)](https://github.com/alexandrelamberty/minerva-api/actions/workflows/prettier.yaml)

# Minerva - Training Management System API

The Training Management System API is a powerful tool designed to streamline and automate the process of managing training programs within an organization. It provides a comprehensive set of endpoints that allow developers to integrate and interact with the Training Management System seamlessly.

## Key Features

- **User Management**: Easily manage user profiles, including creation, modification, and authentication, ensuring secure access to the system.
- **Training Management**: Efficiently create, update, and retrieve training information, including descriptions, category, courses, trainer.
- **Course Management**: Efficiently create, update, and retrieve course information, including descriptions, schedules, trainer.
- **Enrollment**: Enable users to enroll in specific courses, track their progress, and receive notifications for upcoming sessions.
- **Progress Tracking**: Keep tabs on individual learner progress, track completion rates, and generate insightful reports on training performance.
- **Notifications**: Automate communication with users by sending notifications about course updates, enrollment confirmations, and upcoming sessions.
- **Permissions and Roles**: Assign different access levels and roles to users, enabling fine-grained control over the system's functionality.

## Usage

> This API is part of the [Minerva](https://github.com/alexandrelamberty/minerva) project.

## Development

To start the API without launching the complete stack, a MySQL database is needed.
To change the database see <https://sequelize.org/docs/v6/getting-started/> for the sequelize drivers available. After installation change the dialect in `src/models/index.js` and `config/config.js`.

Create an `.env` file and add the following environment variables and fill accordingly with the database configuration. The rest of the configuration work as it is in development.

```properties
API_PORT=3000
DB_SERVER=localhost
DB_ROOT_PASSWORD=localhost
DB_DATABASE=minerva
DB_USERNAME=minerva
DB_PASSWORD=minerva
DB_PORT=3306
JWT_SECRET=d7a481461577ba4c3c4c6946cca7204b
JWT_EXPIRE=1d
JWT_ISSUER=minerva
JWT_AUDIENCE=web-minerva
OPENAI_API_KEY=d7a481461577ba4c3c4c6946cca7204b
```

Start the application in watch mode

```shell
npm run star:dev
```

## Migrations

Run the migrations

```shell
npm run migrate:up
```

Roll back migrations

```shell
npm run migrate:undo
```

### Seeds

Create seed

```shell
npx sequelize-cli seed:generate --name demo-user
```

Running the seeds

```shell
npm run seed:all
```

Roll back seeding

```shell
npm run seed:undo
```

## Tests

## Documentation

## Docker

Build the image.

```shell
docker build . -t alexandrelamberty/minerva-api:tag
```

Run the image with the default network and storage.

// FIXME: add storage reference from stack

```shell
docker run -p 3000:3000 --network=minerva_default --mount source=media_data,target=/usr/src/app/public --env-file .env.dev --name minerva-api -d alexandrelamberty/minerva-api:tag
```

Push image to DockerHub

```shell
docker push alexandrelamberty/minerva-api:tag
```

## References

- <https://expressjs.com/>
- <https://nodejs.org/>
- <https://github.com/ranisalt/node-argon2>
- <https://sequelize.org/docs/v6/>
- <https://sequelize.org/docs/v6/other-topics/migrations/>
- <https://developers.google.com/books/docs/viewer/developers_guide>
- <https://medium.com/@jsmney/a-more-in-depth-look-at-sequelizes-magic-methods-428928c70d58>
- <https://medium.com/@jsmney/a-more-in-depth-look-at-sequelizes-magic-methods-428928c70d58>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Status>
