require('dotenv').config();
const express = require('express');
const path = require("path");
const cors = require('cors');
const helmet = require('helmet');
const routers = require('./routes');

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json({
    limit: '5mb',
}));
app.use(express.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "temp")));


app.use('/', routers);

// catch 404 and return error response
app.use((req, res, _next) => {
    res.status(404).json({
        success: false,
        message: 'Path not found',
    });
});

// client error handler
app.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({
            success: false,
            message: 'Something failed!',
        });
    } else {
        next(err);
    }
});

// error handler
app.use(async (err, req, res, next) => {
    const env = process.env.ENV;
    const isDev =
        env === 'local';

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isDev ? err : {};

    if (err && err.response && err.response.data) {
        console.log(err.response.data);
    }

    try {
        const object = JSON.stringify(
            {
                env,
                request: {
                    httpVersion: req.httpVersion,
                    protocol: req.protocol,
                    host: req.get('host'),
                    baseUrl: req.baseUrl,
                    url: req.url,
                    params: req.params,
                    query: req.query,
                    method: req.method,
                    authToken: req.headers.authorization,
                    body: req.body,
                },
                err: {
                    message: err.message,
                    code: err.code,
                    stack: err.stack && err.stack.split('\n'),
                },
            },
            null,
            4
        );
    } catch (e) {
    }

    // render the error page
    res.status(err.status || 500);
    res.send(
        err.responseEntity
            ? {
                success: err.responseEntity.success,
                message: err.responseEntity.message,
                data: err.responseEntity.data,
            }
            : {
                success: false,
                message: isDev
                    ? err.message
                    : 'Ooops ada kesalahan pada sistem.',
            }
    );
    res.render('error');
});

module.exports = app;
