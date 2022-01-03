# Welcome to the HR Manager Server Project!

This provides the REST API functionality for the [HR Manager Project](https://github.com/ChristineShaffer/hr-manager).

## Development

1. Run Postgres locally in a Docker container by running `./local-postgres.sh` in the project directory.


2. Run the project using `npm run start`.

### Helpful Commands

- You can ping the authentication endpoint by using something like
  ```shell
  curl --header "Content-Type: application/json" --request POST --data '{"username":"derp", "password":"abc123"}' http://localhost:3000/authenticate
  ```
