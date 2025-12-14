const scoringService = require("../services/scoring.service");
const reliabilityService = require("../services/reliability.service");
const compareService = require("../services/compare.service");
const store = require("../data/memory.store");
const { toPublicProfile } = require("../utils/bucket.util");

exports.submitAssessment = (req, res, next) => {
    try {
        const { userId, answers } = req.body;

        if (!userId || !answers) {
            const error = new Error("Invalid request data");
            error.statusCode = 400;
            throw error;
        }

        // 1. scoring
        const scores = scoringService.calculateScores(answers);

        // 2. reliability
        const reliability =
            reliabilityService.checkReliability(answers);

        const result = { userId, scores, reliability };

        // 3. save in memory
        store.save(userId, result);

        res.json({
            message: "Assessment submitted",
            reliability
        });
    } catch (err) {
        next(err);
    }
};

exports.shareProfile = (req, res, next) => {
    const data = store.get(req.params.userId);
    try {
        if (!data) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.json(toPublicProfile(data));
    } catch (err) {
        next(err);
    }
};

exports.compareProfiles = (req, res, next) => {
    const { userA, userB } = req.body;
    try {
        const a = store.get(userA);
        const b = store.get(userB);

        if (!a || !b) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const publicA = toPublicProfile(a);
        const publicB = toPublicProfile(b);

        res.json(compareService.compare(publicA, publicB));
    } catch (err) {
        next(err);
    }

};
