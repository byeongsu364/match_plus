// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// --- 회원가입 (입력값 검증 추가) ---
router.post(
    "/signup",
    [
        body("name", "이름을 입력해주세요.").notEmpty().trim(),
        body("email", "유효한 이메일을 입력해주세요.").isEmail(),
        body("phone_number", "전화번호를 입력해주세요.").notEmpty().trim(),
        body("password", "비밀번호는 최소 6자 이상이어야 합니다.").isLength({ min: 6 }),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, phone_number, password } = req.body;

            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "이미 가입된 이메일입니다." });

            user = await User.findOne({ phone_number });
            if (user) return res.status(400).json({ message: "이미 가입된 전화번호입니다." });

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                phone_number,
                password: hashedPassword,
            });

            const userResponse = {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            };

            const token = jwt.sign(
                { userId: newUser._id, role: newUser.role },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.status(201).json({ message: "회원가입 완료", token, user: userResponse });
        } catch (err) {
            next(err);
        }
    }
);

// --- 로그인 ---
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role,
            tier: user.tier,
        };

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "로그인 성공", token, user: userResponse });
    } catch (err) {
        next(err);
    }
});

// --- 내 정보 조회 ---
router.get("/me", authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// --- 내 정보 수정 ---
router.patch("/me", authMiddleware, async (req, res, next) => {
    try {
        const { name, phone_number } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (phone_number) updateData.phone_number = phone_number;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "수정할 내용을 입력해주세요." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true }
        ).select("-password");

        res.json({ message: "정보가 성공적으로 수정되었습니다.", user: updatedUser });
    } catch (err) {
        next(err);
    }
});

// --- 토큰 검증 ---
router.post("/verify-token", authMiddleware, (req, res) => {
    // authMiddleware에서 유효한 토큰이면 req.user가 존재
    res.json({ valid: true, user: req.user });
});

module.exports = router;
