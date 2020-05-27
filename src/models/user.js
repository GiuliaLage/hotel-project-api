import {Schema, model} from 'mongoose'

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        role: String
    }
);

export default model('User', UserSchema)