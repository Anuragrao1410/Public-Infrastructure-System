const mongoose = require("mongoose");

const entrepreneurSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    businessName: {
        type: String,
        required: true
    },

    businessCategory: {
        type: String,
        required: true
    },

    businessDescription: {
        type: String
    },

    businessLocation: {
        type: String,
        required: true
    },

    yearsInBusiness: {
        type: Number
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Entrepreneur", entrepreneurSchema);