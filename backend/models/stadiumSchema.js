// models/StadiumSchema.js
const mongoose = require("mongoose");

const stadiumSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: {
            type: { type: String, enum: ["Point"], default: "Point" },
            coordinates: { type: [Number], index: "2dsphere" }, // [경도, 위도]
        },
        capacity: { type: Number, required: true },
        available_times: [{ type: String }],

        // ✅ 참가자 수 필드 추가
        participants: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Stadium = mongoose.model("Stadium", stadiumSchema);
module.exports = Stadium;
