const express = require('express');
const router = express.Router();
const login = require('../modules/users/loginUseCase');
const signUp = require('../modules/users/signUpUseCase');

router.post('/login', async (req, res, next) => {
    try {
        const response = await login(req.body);

        res.send(response);
    } catch (e) {
        next(e);
    }
});

router.post('/sign-up', async (req, res, next) => {
    try {
        const response = await signUp(req.body);

        res.send(response);
    } catch (e) {
        next(e);
    }
});

module.exports = router;