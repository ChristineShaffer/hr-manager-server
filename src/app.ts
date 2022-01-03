import express, { Express, Request, Response } from 'express';
import authenticate from './endpoints/authentication/auth';

const app: Express = express();
const port = 3000;

// Add JSON parsing middleware
app.use(express.json());

// Default route just indicates the server is up
app.get('/', (request: Request, response: Response) => {
  response.status(200).json({ message: 'Server is up' });
});

// The authentication route, used for verifying user login credentials and user type
app.use('/authenticate', authenticate);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

// Need to export for testing
export default app;
