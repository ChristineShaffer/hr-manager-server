import { Pool, PoolConfig } from 'pg';
import * as dotenv from 'dotenv';
import { createUserTableSQL } from './tables';

dotenv.config();

/**
 * Class which manages shared database pool.
 */
class Database {
  readonly pool: Pool

  /**
   * Creates a new Postgres database pool if the appropriate environment variables are set.
   * @throws If any of the required environment variables aren't set.
   */
  constructor() {
    if (!process.env.POSTGRES_USER || !process.env.HOST || !process.env.POSTGRES_DB
      || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_PORT) {
      throw new Error('Error initializing database; ensure environment variables are set.');
    }

    const config: PoolConfig = {
      user: process.env.POSTGRES_USER,
      host: process.env.HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
    };

    this.pool = new Pool(config);
  }

  /**
   * Initializes the database tables if they don't exist.
   */
  public async initialize(): Promise<void> {
    try {
      await this.pool.query(createUserTableSQL);
    } catch (err) {
      console.error(`Error initializing database: ${err}`);
    }
  }
}

// The singleton Database instance
let instance: Database;

export default {
  /**
   * Gets the singleton {@link Database} instance. Needs to be async to ensure basic data
   * initialized.
   */
  getInstance: async (): Promise<Database> => {
    if (instance) return instance;

    // Create new instance
    instance = new Database();
    await instance.initialize();
    return instance;
  },
};
