import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    Jobs: {
        type: mongoose.SchemaTypes.Array,
        ref:"Job"
    }
}, {
    collection: "companies",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Company", CompanySchema);