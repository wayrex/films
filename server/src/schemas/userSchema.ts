import mongoose, { Schema, Document } from 'mongoose';
const { isEmail } = require('validator');
import passportLocalMongoose from 'passport-local-mongoose';

export interface UserModel {
    username: string;
    email: string;
}

type UserDocument = UserModel & Document;
const UserSchema = new Schema<UserModel>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: true });
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model<UserModel>("User", UserSchema);

export default User;