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
        password: {
            type: mongoose.SchemaTypes.String,
            required: true
        },
        role: {
            type: mongoose.SchemaTypes.String,
            enum: ["VIEWER", "OWNER", "SUPER_ADMIN"],
            default: "VIEWER",
          },
        jobId: {
            type: mongoose.SchemaTypes.ObjectId,
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