const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        list: [{
            type: mongoose.Types.ObjectId,
            ref: "Todo",
        },],
    },
);
module.exports = mongoose.model("user", userSchema);