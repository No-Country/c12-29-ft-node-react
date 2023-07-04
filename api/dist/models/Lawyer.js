"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LawyerSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    image: {
        url: String,
        public_id: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAuthorized: {
        type: Boolean,
        default: false
    },
    subscription: {
        type: String,
        default: "free"
    },
    specialities: [{
            type: String,
            required: true
        }]
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Lawyer', LawyerSchema);
//# sourceMappingURL=Lawyer.js.map