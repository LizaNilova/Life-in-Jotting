import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isActivated: { type: Boolean, default: false },
    role: { type: String, required: true, default: 'simple' }
}, { timestamps: true })

export default mongoose.model("User", UserSchema)