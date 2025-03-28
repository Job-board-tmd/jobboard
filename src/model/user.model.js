import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
        },
        email: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
        },
        imageUrl: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        jobId: {
            type: mongoose.SchemaTypes.String,
            ref: "Job",
        },
    },
    {
        collection: "users",
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("User", UserSchema);