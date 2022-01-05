/**
 * The User table schema.
 */
export interface UserTable {
  email: string,
  password: string,
  type: 'manager' | 'employee'
}

/**
 * The SQL used to create the user table.
 */
export const createUserTableSQL = 'CREATE TABLE IF NOT EXISTS users ('
    + 'email TEXT PRIMARY KEY NOT NULL,'
    + 'password TEXT NOT NULL,'
    + 'type TEXT NOT NULL,'
    + 'CONSTRAINT check_user_type CHECK (type IN (\'manager\',\'employee\'))'
  + ')';
