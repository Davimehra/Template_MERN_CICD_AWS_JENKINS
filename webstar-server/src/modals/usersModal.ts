import { Mongoose, Schema, Document, Model } from "mongoose";
import { TacklePassword } from "../services/tacklePassword";
const mongoose: Mongoose = require('mongoose');


interface UserAttrs {
    email: String,
    password: String
}

interface UserDoc extends Document {
    email: string;
    password: string;
}

interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userScheama: Schema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v
            },
        },
    }
)


userScheama.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

userScheama.pre('save', async function (next) {
    if (this.isModified("password")) {

        // @ts-ignore 
        const hashed = await TacklePassword.convertToHash(this.get('password'));
        this.set('password', hashed);
    }
    next()
})

const User = mongoose.model<UserDoc, UserModel>("User", userScheama)


export { User }