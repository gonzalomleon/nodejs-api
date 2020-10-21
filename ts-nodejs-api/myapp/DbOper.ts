import { Item } from "./item";
import {MongoClient} from 'mongodb';
import config from '../config/config';
import items from "./items";
import { json } from "body-parser";

export default class DbOper{
    public static async saveItem(item: Item) : Promise<boolean>{
        /**
         * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
         * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
         */
        const client = new MongoClient(config.config.mongo.uri, { useUnifiedTopology: true});
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            const result = await client.db(config.config.mongo.db).collection("items").insertOne(item);
            console.log(`New listing created with the following id: ${result.insertedId}`);
            return await new Promise<boolean>( () => result.insertedCount>0);
            // Make the appropriate DB calls
        } catch (e) {
            console.error(e);
            return new Promise<boolean>( () => false);
        } finally {
            await client.close();
        };
    };

    public static async getItems() {
        /**
         * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
         * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
         */
        const client = new MongoClient(config.config.mongo.uri, { useUnifiedTopology: true});
        try {
            const items:Item[] = [];
            // Connect to the MongoDB cluster
            await client.connect();
            const result = await client.db(config.config.mongo.db).collection("items").find()
            .forEach( (item) => {
                if(item!=null)
                {
                    items.push(item);
                }
            } );
            return items;
            // Make the appropriate DB calls
        } catch (e) {
            console.error(e);
            return null;
        } finally {
            await client.close();
        };
    };

}