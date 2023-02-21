const router = require('express').Router();

const usersRoute = require('./users');
const jobsRoute = require('./jobs');

router.get('/', function(req, res) {
    res.send(`Dans ${process.env.VERSION}`)
});

router.use('/v1/users', usersRoute);
router.use('/v1/jobs', jobsRoute);

module.exports = router;