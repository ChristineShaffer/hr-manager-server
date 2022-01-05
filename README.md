# Welcome to the HR Manager Server Project!

This provides the REST API functionality for the [HR Manager Project](https://github.com/ChristineShaffer/hr-manager).

## Development

1. Run Postgres locally in a Docker container by running `./local-postgres.sh` in the project directory.


2. Run the project using `npm run start`.

### Notes

- You can ping the authentication endpoint by using something like
  ```shell
  curl --header "Content-Type: application/json" --request GET --data '{"email":"derp@example.com", "password":"abc123"}' http://localhost:3000/authenticate
  ```
- There are two test users created whenever the server starts up:

  | Email | Password |
  | ----------- | ----------- |
  | manager@example.com | Abc123 |
  | employee@example.com | Def456 |
