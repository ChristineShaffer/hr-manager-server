import express, { Request, Response, Router } from 'express';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import db from '../../database/database';
import { UserTable } from '../../database/tables';

const router: Router = express.Router();

/**
 * Authentication route which verifies the provided user credentials against the Postgres db and
 * returns the user type if authenticated.
 * @param request.body.username {string} - The username of the user trying to authenticate.
 * @param request.body.password {String} - The password of the user trying to authenticate.
 * @returns {{ authenticated: boolean, userType: null|'manager'|'employee' }} The authentication
 *  status and user type if authentication was successful.
 */
export default router.get('/', async (request: Request, response: Response) => {
  const dbInstance = await db.getInstance();

  if (typeof request.body.username !== 'string') {
    response.status(400).send('Username must be a string.');
    return;
  }

  if (typeof request.body.password !== 'string') {
    response.status(400).send('Password must be a string.');
    return;
  }

  const result: QueryResult<UserTable> = await dbInstance.pool.query(
    `SELECT * FROM users WHERE username='${request.body.username}'`,
  );

  // User does not exist noop
  if (!result.rows.length) {
    response.status(200).json({ authenticated: false, userType: null });
    return;
  }

  const user: UserTable = result.rows[0];

  const match = await bcrypt.compare(request.body.password, user.passwordHash);

  if (match) {
    // Authentication successful
    response.status(200).json({ authenticated: true, userType: user.type });
    return;
  }

  response.status(200).json({ authenticated: false, userType: null });
});
