// routes/stadiums.js

const express = require("express");
const router = express.Router();
const Stadium = require("../models/StadiumSchema");
const { authMiddleware, adminOnly } = require("../middleware/auth");
const mongoose = require("mongoose");

// --- 구장 등록 (관리자 전용) ---
router.post("/", authMiddleware, adminOnly, async (req, res, next) => {
    try {
<<<<<<< HEAD
        const { name, location, capacity, available_times } = req.body;

        if (!name || !location || !capacity || !available_times) {
            return res.status(400).json({ message: "필수 데이터가 누락되었습니다." });
        }

        // location 안의 coordinates가 배열인지 체크
        if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
            return res.status(400).json({ message: "위치 좌표가 올바르지 않습니다." });
        }

        const stadium = await Stadium.create({
            name,
            location, // 프론트에서 보낸 location 객체 그대로 사용
            capacity,
            available_times,
=======
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
>>>>>>> bs
        });

        res.status(201).json(stadium);
    } catch (err) {
<<<<<<< HEAD
        console.error(err);
        res.status(500).json({ message: "구장 등록 중 서버 오류가 발생했습니다." });
=======
        next(err);
>>>>>>> bs
    }
});

// --- 전체 구장 조회 ---
<<<<<<< HEAD
router.get("/", async (req, res) => {
=======
router.get("/", async (req, res, next) => {
>>>>>>> bs
    try {
        const stadiums = await Stadium.find();
        res.json(stadiums);
    } catch (err) {
<<<<<<< HEAD
        console.error(err);
        res.status(500).json({ message: "구장 조회 중 오류가 발생했습니다." });
=======
        next(err);
>>>>>>> bs
    }
});

// --- 개별 구장 상세 조회 ---
<<<<<<< HEAD
router.get("/:id", async (req, res) => {
=======
router.get("/:id", async (req, res, next) => {
>>>>>>> bs
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
        console.error(err);
        res.status(500).json({ message: "구장 조회 중 오류가 발생했습니다." });
    }
});

// --- 구장 정보 수정 (관리자 전용) ---
<<<<<<< HEAD
router.patch("/:id", authMiddleware, adminOnly, async (req, res) => {
=======
router.patch("/:id", authMiddleware, adminOnly, async (req, res, next) => {
>>>>>>> bs
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "유효하지 않은 구장 ID입니다." });
        }

<<<<<<< HEAD
        const updatedStadium = await Stadium.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
=======
        const updatedStadium = await Stadium.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
>>>>>>> bs

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
        console.error(err);
        res.status(500).json({ message: "구장 수정 중 오류가 발생했습니다." });
    }
});

// --- 구장 삭제 (관리자 전용) ---
<<<<<<< HEAD
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
=======
router.delete("/:id", authMiddleware, adminOnly, async (req, res, next) => {
>>>>>>> bs
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
        console.error(err);
        res.status(500).json({ message: "구장 삭제 중 오류가 발생했습니다." });
    }
});

module.exports = router;
