const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const { PORT, DATABASE, ALLOWED_ORIGIN } = require('./configs/config');
const { authRouter, adminRouter, userRouter, productRouter } = require('./routes');
const cronJobs = require('./cron');

mongoose.connect(DATABASE);

const app = express();

app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(helmet());

if (process.env.ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);
app.use(_globalErrorHandler);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen on port ${PORT}`);
    cronJobs();
});

// eslint-disable-next-line no-unused-vars
function _globalErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Something went wrong'
        });
}

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
}
