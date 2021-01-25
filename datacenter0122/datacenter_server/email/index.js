const NodeEmail = require('nodemailer');
const { emailConfig } = require('../../config/base');
const EmailModel = require('../db/model/Email');
const UserModel = require('../db/model/user');
const { EmailExistHttpException } = require('../lib/HttpException')
const transporter = NodeEmail.createTransport({
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: emailConfig.auth // => { user: 你的邮箱, pass: 你的邮箱密码，开启POP3/SMTP的密码，如上图 }
});

class Email {

    static async getEmailCode(email) {
        const user = await UserModel.findUser(email);
        if (user) throw new EmailExistHttpException();
        const db = await EmailModel.findEmail(email);

        // 生成验证码
        let code = Math.random().toString().slice(-6);

        if (!db) { // 当前email不存在，既没有给该email发送过验证码
            await EmailModel.inster(email, code);
        } else { // 当前email，已经发送了验证码
            const startTime = new Date(db.createdAt).getTime();
            const intervalTime = 1000 * 60 * 60; // 过期时间
            if (new Date().getTime() - startTime > intervalTime ){
                await EmailModel.updateCode(email, code);
            }else{
                code = db.email_code;
            }
        }
        const subject = "账号注册";
        const text = "text";
        const html = `<div><span>验证码：</span><b>${code}</b></div>`;
        await Email.SendEmail(email, subject, text, html);
        return { message: '邮件已发送' };
    }

    static async SendEmail(email, subject, text, html) {
        return await transporter.sendMail({
            from: emailConfig.auth.user, // 发送者邮箱地址
            to: email,                   // 接收这邮箱地址
            subject,                     // 邮件主题
            html,                        // html模板
            text                         // 文本内容
        })
    }
}


module.exports = Email;
