const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body:{
            type: String,
            required: true,
        },
        user:[{
            type: mongoose.Types.ObjectId,
            ref: "user", 
        },],
    },
    {timestamps: true}
);

module.exports =mongoose.model("Todo",TodoSchema);