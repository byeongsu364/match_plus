const express = require("express");
const router = express.Router();
const Reservation = require("../models/ReservationSchema");
const Stadium = require("../models/stadiumSchema");
const { authMiddleware, adminOnly } = require("../middleware/auth");
const mongoose = require("mongoose");

// --- ✅ 예약 생성 (중복 방지 + 유저/구장 ObjectId 변환 보장) ---
router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { stadiumId, time } = req.body;
        const userId = req.user.userId; // 🔥 JWT에서 가져온 유저 id

        console.log("📩 [예약 요청] user:", userId, "stadium:", stadiumId, "time:", time);

        // --- 유효성 검사 ---
        if (!mongoose.Types.ObjectId.isValid(stadiumId)) {
            return res.status(400).json({ message: "유효하지 않은 구장 ID입니다." });
        }
        if (!time) {
            return res.status(400).json({ message: "예약 시간을 입력해주세요." });
        }

        // --- 구장 확인 ---
        const stadium = await Stadium.findById(stadiumId);
        if (!stadium) return res.status(404).json({ message: "구장을 찾을 수 없습니다." });

        if (!stadium.available_times.includes(time)) {
            return res.status(400).json({ message: "해당 시간대는 예약 불가합니다." });
        }

        // --- 중복 예약 방지 ---
        const existingReservation = await Reservation.findOne({
            stadium: stadiumId,
            time,
            status: "reserved",
        });
        if (existingReservation) {
            return res.status(409).json({ message: "이미 예약된 시간대입니다." });
        }

        // --- ✅ ObjectId 강제 변환 ---
        const reservation = new Reservation({
            user: new mongoose.Types.ObjectId(userId),
            stadium: new mongoose.Types.ObjectId(stadiumId),
            time,
        });

        await reservation.save();
        console.log("✅ 예약 생성 완료:", reservation);

        // --- ✅ 구장 참가자 수 증가도 같이 ---
        stadium.participants = (stadium.participants ?? 0) + 1;
        await stadium.save();

        res.status(201).json({
            message: "예약이 완료되었습니다.",
            reservation,
            updatedParticipants: stadium.participants,
        });
    } catch (err) {
        console.error("❌ 예약 생성 중 오류:", err);
        next(err);
    }
});


// --- ✅ 내 예약 조회 ---
router.get("/my", authMiddleware, async (req, res, next) => {
    try {
        const { recent } = req.query;
        console.log("📡 [내 예약 조회] userId:", req.user.userId, "recent:", recent);

        let query = Reservation.find({ user: req.user.userId })
            .populate("stadium", "name location")
            .sort({ createdAt: -1 });

        if (recent === "true") query = query.limit(5);

        const reservations = await query;
        console.log("✅ [내 예약 목록]", reservations);

        res.json(reservations);
    } catch (err) {
        console.error("❌ 내 예약 조회 오류:", err);
        next(err);
    }
});

// --- ✅ 특정 유저 예약 조회 ---
router.get("/user/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { recent } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
        }

        console.log("📡 [특정 유저 예약 조회] id:", id, "recent:", recent);

        let query = Reservation.find({ user: id })
            .populate("stadium", "name location")
            .sort({ createdAt: -1 });

        if (recent === "true") query = query.limit(5);

        const reservations = await query;
        console.log("✅ [특정 유저 예약 목록]", reservations);

        res.json(reservations);
    } catch (err) {
        console.error("❌ 특정 유저 예약 조회 오류:", err);
        next(err);
    }
});

// --- ✅ 예약 취소 ---
router.patch("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("📡 [예약 취소 요청] id:", id, "user:", req.user.userId);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "유효하지 않은 예약 ID입니다." });
        }

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: "예약 정보를 찾을 수 없습니다." });
        }

        // 본인 예약만 취소 가능
        if (reservation.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "예약을 취소할 권한이 없습니다." });
        }

        // 이미 취소된 예약은 변경 불가
        if (reservation.status === "canceled") {
            return res.status(400).json({ message: "이미 취소된 예약입니다." });
        }

        reservation.status = "canceled";
        await reservation.save();

        console.log("✅ 예약 취소 완료:", reservation);

        res.json({ message: "예약이 성공적으로 취소되었습니다.", reservation });
    } catch (err) {
        console.error("❌ 예약 취소 중 오류:", err);
        next(err);
    }
});

// --- ✅ 전체 예약 목록 조회 (관리자 전용) ---
router.get("/", authMiddleware, adminOnly, async (req, res, next) => {
    try {
        console.log("📡 [관리자 예약 전체 조회]");
        const reservations = await Reservation.find({})
            .populate("stadium", "name")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(reservations);
    } catch (err) {
        console.error("❌ 전체 예약 목록 조회 오류:", err);
        next(err);
    }
});

module.exports = router;
