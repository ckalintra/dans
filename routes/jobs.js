const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth-middleware');
const jobList = require('../modules/jobs/getJobListUseCase');
const jobDetail = require('../modules/jobs/getJobDetailUseCase');

router.get('/list', auth.validateToken, async (req, res, next) => {
    try {
        const response = await jobList(req.query)

        res.send(response);
    } catch (e) {
        next(e);
    }
});

router.get('/detail/:id', auth.validateToken, async (req, res, next) => {
    try {
        const response = await jobDetail(req.params)

        res.send(response);
    } catch (e) {
        next(e);
    }
});



module.exports = router;