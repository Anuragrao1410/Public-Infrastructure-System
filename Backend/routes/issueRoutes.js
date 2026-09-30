const express = require("express");
const Issue = require("../models/issue");
const multer = require("multer");
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Create new issue
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const {
    title,
    category,
    description,
    latitude,
    longitude,
    reportedBy
} = req.body;

        const issue = new Issue({
            title,
            category,
            description,
            image: req.file ? req.file.path : undefined,
            latitude,
            longitude,
            reportedBy
        });

        await issue.save();

        res.status(201).json({
            message: "Issue reported successfully",
            issue
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get all issues
router.get("/", async (req, res) => {
    try {
        const issues = await Issue.find()
            .populate("reportedBy", "name email role")
            .sort({ createdAt: -1 });

        res.json(issues);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update issue status
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        res.json({
            message: "Issue status updated successfully",
            issue
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
