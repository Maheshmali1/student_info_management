import { createServer } from './utils';
import dotenv from 'dotenv';
dotenv.config();

const app = createServer();

const PORT = (process.env.PORT != null) ? process.env.PORT : 3000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}..`);
});
