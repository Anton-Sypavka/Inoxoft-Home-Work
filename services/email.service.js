const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const ErrorHandler = require('../errors/errorHandler');
const { EMAIL_ACCOUNT_ADDRESS, EMAIL_ACCOUNT_PASSWORD } = require('../configs/config');
const { INTERNAL_SERVER_ERROR } = require('../configs/errorCodes.enum');
const templatesActions = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ACCOUNT_ADDRESS,
        pass: EMAIL_ACCOUNT_PASSWORD
    },
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const currentTemplate = templatesActions[emailAction];

    if (!currentTemplate) throw new ErrorHandler(INTERNAL_SERVER_ERROR, 'Wrong tremplate name');

    const html = await templateParser.render(currentTemplate.emailTemplateName, context);

    return transporter.sendMail({
        from: 'no-reply',
        to: userMail,
        subject: currentTemplate.subject,
        html
    });
};

module.exports = {
    sendMail
};
