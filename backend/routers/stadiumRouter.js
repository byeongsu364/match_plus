// routes/stadiums.js

const express = require("express");
const router = express.Router();
const Stadium = require("../models/stadiumSchema");
const { authMiddleware, adminOnly } = require("../middleware/auth");
const mongoose = require("mongoose"); // ADDED: For ObjectId validation

// --- 구장 등록 (관리자 전용) ---
router.post("/", authMiddleware, adminOnly, async (req, res, next) => {
    try {
        const { name, latitude, longitude, capacity, available_times } = req.body;

        const stadium = await Stadium.create({
            name,
            location: {
                type: "Point",
                coordinates: [longitude, latitude], // 경도, 위도 순서
            },
            capacity,
            available_times,
            participants: 0, // 처음 생성 시 0으로 초기화
        });

        res.status(201).json(stadium);
    } catch (err) {
        next(err);
    }
});

// --- 전체 구장 조회 ---
router.get("/", async (req, res, next) => {
    try {
        const stadiums = await Stadium.find();
        res.json(stadiums);
    } catch (err) {
        next(err);
    }
});

// --- 개별 구장 상세 조회 ---
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "유효하지 않은 구장 ID입니다." });
        }

        const stadium = await Stadium.findById(id);
        if (!stadium) {
            return res.status(404).json({ message: "구장을 찾을 수 없습니다." });
        }
        res.json(stadium);
    } catch (err) {
        next(err);
    }
});

// --- 구장 정보 수정 (관리자 전용) ---
router.patch("/:id", authMiddleware, adminOnly, async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "유효하지 않은 구장 ID입니다." });
        }

        const updatedStadium = await Stadium.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedStadium) {
            return res.status(404).json({ message: "구장을 찾을 수 없습니다." });
        }
        res.json({
            message: "구장 정보가 성공적으로 수정되었습니다.",
            stadium: updatedStadium,
        });
    } catch (err) {
        next(err);
    }
});

// --- ✅ 경기 신청 인원 증가 (참가자 수 업데이트) ---
router.patch("/:id/apply", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "유효하지 않은 구장 ID입니다." });
        }

        const stadium = await Stadium.findById(id);
        if (!stadium) {
            return res.status(404).json({ message: "구장을 찾을 수 없습니다." });
        }

        // ⚠️ 최대 인원 초과 방지
        if (stadium.participants >= stadium.capacity) {
            return res.status(400).json({ message: "정원이 가득 찼습니다." });
        }

        // ✅ 신청 인원 +1 업데이트
        stadium.participants = (stadium.participants ?? 0) + 1;
        const updated = await stadium.save();

        res.json({
            message: "경기 신청이 완료되었습니다.",
            participants: updated.participants,
        });
    } catch (err) {
        next(err);
    }
});

// --- 구장 삭제 (관리자 전용) ---
router.delete("/:id", authMiddleware, adminOnly, async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "유효하지 않은 구장 ID입니다." });
        }

        const deletedStadium = await Stadium.findByIdAndDelete(id);

        if (!deletedStadium) {
            return res.status(404).json({ message: "구장을 찾을 수 없습니다." });
        }
        res.status(200).json({ message: "구장이 성공적으로 삭제되었습니다." });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
