const express = require('express');
const router = express.Router();
const RewardController = require('../controllers/rewardsController')

/**
 * @swagger
 * /rewards/claim:
 *   post:
 *     summary: Claim a reward for a user
 *     tags: [Rewards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               rewardType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reward claimed successfully
 */

router.post('/claim', RewardController.createReward );
router.get('/claim/:id', RewardController.getRewardById );
router.patch('/claim/:id', RewardController.updateReward);
router.delete('/claim/:id', RewardController.deleteReward );

module.exports = router;

