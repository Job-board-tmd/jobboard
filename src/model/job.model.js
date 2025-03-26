import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    },{
        collection: "categories",
        timestamps: true,
        versionKey: false,
    })

export default mongoose.model("Job",JobSchema);