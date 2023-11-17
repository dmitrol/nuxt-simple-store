import mongoose from 'mongoose';
import { Nitro } from 'nitropack';

export default (_nitroApp: Nitro) => {
  // run your connect code here
  const config = useRuntimeConfig();
  // connect to mongodb
  mongoose
    .connect(config.MONGO_URI, { dbName: config.MONGO_DB_NAME })
    .then(() => console.log('Connected to DB'))
    .catch((error: any) => console.log(error));
};
