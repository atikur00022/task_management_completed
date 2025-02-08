import mongoose from 'mongoose';
import {DEFAULT_IMAGE} from "../config/config.js";

const DataSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, lowercase: true, trim: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        mobile: { type: String, required: true },
        password: { type: String, required: true },
        photo: { type: String, default: DEFAULT_IMAGE },
        createdAt: { type: Date, default: Date.now() },
    },
    {
        versionKey: false
    }
);

const UserModel = mongoose.model('users', DataSchema);

export default UserModel;