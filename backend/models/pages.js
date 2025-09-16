import mongoose from "mongoose";

//Дописати налаштування, айді тегів

const PagesSchema = new mongoose.Schema({
    notebook: { type: String, required: true },
    title: { type: String, required: true },
    bg_color: { type: String, default: "#FFFFFF" },
    category: { type: String, default: "Різне" },
    blocks: [
        {
            text: { type: String },
            depth: { type: Number, default: 0 }, //убрать потом
            isDone: { type: Boolean, default: false },
            inlineStyleRanges: [
                {
                    offset: { type: Number },
                    length: { type: Number },
                    style: { type: String },
                    text_color: { type: String, default: "#000000" },
                }
            ],
            entityRanges: [
                {
                    offset: { type: Number, default: 0 },
                    // type: { type: String },                 //image, toDoList, ...
                    src: { type: String },                  //for image type
                    // height: { type: String, default: "auto" },
                    // width: { type: String, default: "auto" },
                    // alignSelf: { type: String, default: "center" },
                    // toDoItems: [{                           // for to-do list type
                    //     text: { type: String },
                    //     done: { type: Boolean, default: false }
                    // }]
                }
            ],
            font: { type: String, default: "Marmelad" },
            fontSize: { type: Number, default: 14 },
            border_color: { type: String, default: "#000000" },
            textAlign: { type: String, default: "left" }
        }
    ],
    bg_url: { type: String, default: "" }
}, { timestamps: true })

export default mongoose.model("Page", PagesSchema)