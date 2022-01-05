import express, { Request, Response, Router } from 'express';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import db from '../../database/database';
import { UserTable } from '../../database/tables';

const router: Router = express.Router();

/**
 * Authentication route which verifies the provided user credentials against the Postgres db and
 * returns the user type if authenticated.
 * @param request.body.email {string} - The email address of the user trying to authenticate.
 * @param request.body.password {String} - The password of the user trying to authenticate.
 * @returns {{ authenticated: boolean, userType: null|'manager'|'employee' }} The authentication
 *  status and user type if authentication was successful.
 */
export default router.get('/', async (request: Request, response: Response) => {
  let dbInstance;
  try {
    dbInstance = await db.getInstance();
  } catch (err) {
    console.error(`Error getting database instance: ${err}`);
    response.status(500).end();
    return;
  }

  if (typeof request.body.email !== 'string') {
    response.status(400).send({ error: 'Email must be a string.' });
    return;
  }

  if (typeof request.body.password !== 'string') {
    response.status(400).send({ error: 'Password must be a string.' });
    return;
  }

  const result: QueryResult<UserTable> = await dbInstance.pool.query(
    `SELECT * FROM users WHERE email='${request.body.email}'`,
  );

  // User does not exist noop
  if (!result.rows.length) {
    response.status(200).json({ authenticated: false, userType: null });
    return;
  }

  const user: UserTable = result.rows[0];

  let match: boolean = false;
  try {
    // Check the password matches
    match = bcrypt.compareSync(request.body.password, user.password);
  } catch (err) {
    console.error(`Error comparing password: ${err}`);
    response.status(500).end();
    return;
  }

  if (match) {
    // Authentication successful
    response.status(200).json({ authenticated: true, userType: user.type });
    return;
  }

  response.status(200).json({ authenticated: false, userType: null });
});
