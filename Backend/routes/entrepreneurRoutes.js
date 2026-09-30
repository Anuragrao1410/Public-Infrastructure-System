const express = require("express");
const Entrepreneur = require("../models/entrepreneur");

const router = express.Router();

// Create entrepreneur profile
router.post("/", async (req, res) => {
    try {
        const {
            userId,
            name,
            email,
            phone,
            businessName,
            businessCategory,
            businessDescription,
            businessLocation,
            yearsInBusiness
        } = req.body;

        const entrepreneur = new Entrepreneur({
            userId,
            name,
            email,
            phone,
            businessName,
            businessCategory,
            businessDescription,
            businessLocation,
            yearsInBusiness
        });

        await entrepreneur.save();

        res.status(201).json({
            message: "Entrepreneur profile created successfully",
            entrepreneur
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get entrepreneur profile
router.get("/:userId", async (req, res) => {
    try {
        const entrepreneur = await Entrepreneur.findOne({
            userId: req.params.userId
        });

        if (!entrepreneur) {
            return res.status(404).json({
                message: "Entrepreneur profile not found"
            });
        }

        res.json(entrepreneur);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update entrepreneur profile
router.put("/:userId", async (req, res) => {
    try {
        const entrepreneur = await Entrepreneur.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        );

        if (!entrepreneur) {
            return res.status(404).json({
                message: "Entrepreneur profile not found"
            });
        }

        res.json({
            message: "Entrepreneur profile updated successfully",
            entrepreneur
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;