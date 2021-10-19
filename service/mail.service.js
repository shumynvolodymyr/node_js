const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {config: {EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS}} = require('../config');
const allTemplates = require('../email_templates');
const {ErrorHandler} = require('../errors');
const {messagesEnum: {WRONG_TEMPLATE}} = require('../errors');
const {ResponseStatusCodesEnum: {NOT_FOUND}} = require('../config');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email_templates')
    }
});

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

const sendMail = async (userMail, action, contex = {}) => {

    const templateToSend = allTemplates[action];

    if (!templateToSend) {
        throw new ErrorHandler(WRONG_TEMPLATE, NOT_FOUND);
    }

    const html = await templateParser.render(templateToSend.templateName, contex);

    return transporter.sendMail({
        from: '"Anonymous 👻" <noreply@xample.com>',
        to: userMail,
        subject: templateToSend.subject,
        html
    });
};

module.exports = {sendMail};
