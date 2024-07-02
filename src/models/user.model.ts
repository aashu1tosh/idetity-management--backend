import mongoose, { Schema, Document } from 'mongoose';
import { ROLE } from '../constant/enum';
import { Message } from '../constant/messages';
import {
    emailAddressRegex,
    passwordRegex,
    phoneNumberRegex,
} from '../constant/regex';
import { IUser } from '../interface/user.interface';

// Interface for User
interface IUserDocument extends Document, IUser {}

const userSchema = new Schema<IUserDocument>(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [emailAddressRegex, Message.validEmailAddress],
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: [phoneNumberRegex, Message.validPhoneNumber],
        },
        password: {
            type: String,
            required: true,
            match: [passwordRegex, Message.passwordShouldStrong],
        },
        role: {
            type: String,
            enum: Object.values(ROLE),
            default: ROLE.USER,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
