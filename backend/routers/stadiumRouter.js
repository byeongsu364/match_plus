// routes/stadiums.js
const express = require("express");
const router = express.Router();
const Stadium = require("../models/stadiumSchema");
const { authMiddleware, adminOnly } = require("../middleware/auth");
const mongoose = require("mongoose");

// --- ✅ 구장 등록 (운영용: 관리자 전용 / 개발 시 일반 user도 허용 가능) ---
router.post("/", authMiddleware, async (req, res, next) => {
    try {
        console.log("📩 [구장 등록 요청 BODY]", req.body);
        console.log("👤 [요청 유저]", req.user);

        const { name, latitude, longitude, capacity, available_times } = req.body;

        // ✅ 운영 배포 시 이 라인 주석 해제 (관리자만 허용)
        if (req.user.role !== "admin") {
            console.warn("⚠️ 비관리자 구장 등록 시도:", req.user.role);
            // return res.status(403).json({ message: "관리자만 구장 등록이 가능합니다." });
        }

        // ✅ 필수값 검증
        if (!name || latitude == null || longitude == null) {
            console.error("❌ 필수값 누락:", { name, latitude, longitude });
            return res.status(400).json({ message: "이름, 위도, 경도를 모두 입력해주세요." });
        }

        // ✅ 타입 검증 (숫자 변환)
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        if (isNaN(lat) || isNaN(lon)) {
            console.error("❌ 위도/경도 타입 오류:", { latitude, longitude });
            return res.status(400).json({ message: "위도(latitude), 경도(longitude)는 숫자여야 합니다." });
        }

        // ✅ 구장 생성
        const stadium = await Stadium.create({
            name,
            location: {
                type: "Point",
                coordinates: [lon, lat], // ⚠️ 경도, 위도 순서 중요
            },
            capacity: parseInt(capacity) || 0,
            available_times: Array.isArray(available_times)
                ? available_times
                : typeof available_times === "string"
                    ? available_times.split(",").map((t) => t.trim())
                    : [],
            participants: 0,
        });

        console.log("✅ 구장 생성 성공:", stadium.name);
        return res.status(201).json({
            message: "구장이 성공적으로 등록되었습니다.",
            stadium,
        });
    } catch (err) {
        console.error("❌ 구장 등록 오류:", err);
        return res.status(500).json({ message: "구장 등록 중 오류가 발생했습니다." });
    }
});

// --- ✅ 전체 구장 조회 ---
router.get("/", async (req, res, next) => {
    try {
        const stadiums = await Stadium.find();
        res.json(stadiums);
    } catch (err) {
        console.error("❌ 구장 목록 조회 오류:", err);
        res.status(500).json({ message: "구장 목록 조회 중 오류가 발생했습니다." });
    }
});

// --- ✅ 개별 구장 상세 조회 ---
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
        console.error("❌ 구장 상세 조회 오류:", err);
        res.status(500).json({ message: "구장 조회 중 오류가 발생했습니다." });
    }
});

// --- ✅ 구장 정보 수정 (관리자 전용) ---
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

        console.log("🛠️ 구장 수정 완료:", updatedStadium.name);
        res.json({
            message: "구장 정보가 성공적으로 수정되었습니다.",
            stadium: updatedStadium,
        });
    } catch (err) {
        console.error("❌ 구장 수정 오류:", err);
        res.status(500).json({ message: "구장 수정 중 오류가 발생했습니다." });
    }
});

// --- ✅ 경기 신청 인원 증가 ---
router.patch("/:id/apply", async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("📩 경기 신청 요청:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "유효하지 않은 구장 ID입니다." });
        }

        const stadium = await Stadium.findById(id);
        if (!stadium) {
            return res.status(404).json({ message: "구장을 찾을 수 없습니다." });
        }

        // ⚠️ 인원 제한 확인
        if (stadium.participants >= stadium.capacity) {
            return res.status(400).json({ message: "정원이 가득 찼습니다." });
        }

        // ✅ 참가자 수 증가
        stadium.participants = (stadium.participants ?? 0) + 1;
        await stadium.save();

        console.log("✅ 참가자 수 업데이트:", stadium.participants);
        res.json({
            message: "경기 신청이 완료되었습니다.",
            participants: stadium.participants,
        });
    } catch (err) {
        console.error("❌ 경기 신청 오류:", err);
        res.status(500).json({ message: "경기 신청 처리 중 오류가 발생했습니다." });
    }
});

// --- ✅ 구장 삭제 (관리자 전용) ---
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

        console.log("🗑️ 구장 삭제 완료:", deletedStadium.name);
        res.status(200).json({ message: "구장이 성공적으로 삭제되었습니다." });
    } catch (err) {
        console.error("❌ 구장 삭제 오류:", err);
        res.status(500).json({ message: "구장 삭제 중 오류가 발생했습니다." });
    }
});

module.exports = router;
