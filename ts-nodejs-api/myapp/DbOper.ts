import { Item } from "./item";
import {MongoClient} from 'mongodb';
import config from '../config/config';

export default class DbOper{
    public static async saveItem(item: Item){
        /**
         * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
         * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
         */
        const uri = config.config.mongo.uri;
        const client = new MongoClient(uri, { useUnifiedTopology: true});
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            const result = await client.db("db-test").collection("items").insertOne(item);
            console.log(`New listing created with the following id: ${result.insertedId}`);
            // Make the appropriate DB calls
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        };
    };

}