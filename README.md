# Welcome to the HR Manager Server Project!

This provides the REST API functionality for the [HR Manager Project](https://github.com/ChristineShaffer/hr-manager).

## Development

1. Run Postgres locally in a Docker container by running `./local-postgres.sh` in the project directory.


2. Configure the `.env` file with the following environment variables:
   ```
   POSTGRES_DB=hrdb
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=admin
   POSTGRES_PORT=5432
   POSTGRES_HOST=localhost // The postgres host; would be host.docker.internal when running this project containerized
   CLIENT_URL=http://localhost:8080 // URL where the client is being served without a '/' at the end
   ```


3. Run the project using `npm run start`.

### Notes

- You can ping the authentication endpoint by using something like
  ```shell
  curl --header "Content-Type: application/json" --request GET --data '{"email":"manager@example.com", "password":"Abc123"}' http://localhost:3000/authenticate
  ```
- There are two test users created whenever the server starts up:

  | Email | Password |
  | ----------- | ----------- |
  | manager@example.com | Abc123 |
  | employee@example.com | Def456 |
