import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import authenticate from './endpoints/authentication/auth';
import db from './database/database';

const app: Express = express();
const port = 3000;

// Add JSON parsing middleware
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
  credentials: true,
}));

// Default route just indicates the server is up
app.get('/', (request: Request, response: Response) => {
  response.status(200).json({ message: 'Server is up' });
});

// The authentication route, used for verifying user login credentials and user type
app.use('/authenticate', authenticate);

// Initialize the db with default data
(async () => {
  try {
    await db.getInstance();
  } catch (err) {
    console.error('Could not initialize test users in database.');
  }
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

// Need to export for testing
export default app;
