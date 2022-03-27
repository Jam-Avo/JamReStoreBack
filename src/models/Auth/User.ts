import mongoose, { Schema, model, Document, Model } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser {
    name: string,
    email: string,
    password: string,
};

export interface IUserDocument extends IUser, Document {
    encryptPassword: (password: string) => Promise<string>;
    validatePassword: (password: string, hashPassword: string) => Promise<boolean>;
};

interface IUserModel extends Model<IUserDocument> {
}

const UserSchema: Schema<IUserDocument> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.methods.encryptPassword = async (password: string) => {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
}

UserSchema.methods.validatePassword = async (password: string, hashPassword: string) => {
    return bcryptjs.compare(password, hashPassword);
}

export default model<IUserDocument, IUserModel>("User", UserSchema);