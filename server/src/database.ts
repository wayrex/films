import * as mongodb from "mongodb";

import { Film } from "./models/film";

export const collections: {
    films?: mongodb.Collection<Film>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("films");
    // await applySchemaValidation(db);

    const filmsCollection = db.collection<Film>("films");
    filmsCollection.createIndex({ filmId: 1 }, { unique: true });
    collections.films = filmsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Film model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' is required as a string",
                },
                // filmId: {
                //     bsonType: "string",
                //     description: "The movie already exists",
                //     uniqueItems: true
                // }
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "films",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("films");
            // await db.createCollection("films", { validator: jsonSchema });
        }
    });
}