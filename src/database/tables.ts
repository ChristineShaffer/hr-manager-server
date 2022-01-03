/**
 * The User table schema.
 */
export interface UserTable {
  username: string,
  passwordHash: string,
  type: 'manager'|'employee'
}

/**
 * The SQL used to create the user table.
 */
export const createUserTableSQL = 'CREATE TABLE IF NOT EXISTS users ('
    + 'username CHAR(50) PRIMARY KEY NOT NULL,'
    + 'password BYTEA NOT NULL,'
    + 'passwordHash BYTEA NOT NULL,'
    + 'type CHAR(50) NOT NULL,'
    + 'CONSTRAINT check_user_type CHECK (type IN (\'manager\',\'employee\'))'
  + ')';
