import { createConnection, getConnectionOptions, ConnectionOptions } from 'typeorm';

(async () => {
  const createConnectionOptions: ConnectionOptions = await getConnectionOptions();
  await createConnection(Object.assign(createConnectionOptions, { host: process.env.DB_HOST }));
})();