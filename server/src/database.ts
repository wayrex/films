import { connect } from 'mongoose';

export async function connectToDatabase(uri: string) {
    await connect(uri);
}