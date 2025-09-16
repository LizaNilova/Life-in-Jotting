import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    userId: { type: String, required: true },
    eventContent: { type: String },
}, { timestamps: true })

export default mongoose.model("Event", EventSchema)