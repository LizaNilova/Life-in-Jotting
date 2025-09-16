import mongoose from "mongoose";

const NotebookSchema = new mongoose.Schema({
    user: { type: String, required: true },
    name: { type: String, required: true },
    cover: { type: String }
})

export default mongoose.model("Notebook", NotebookSchema)