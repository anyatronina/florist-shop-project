const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  async sendResetPassword(to, passwordForReset) {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: config.get("authMail"),
    });

    await transporter.sendMail({
      from: "wonderful shop ✨ wonderful_project@inbox.ru",
      to,
      subject: "Восстановление пароля",
      text: "",
      html: `<div><h3>Ваш временный пароль<h3><h5>${passwordForReset}</h5></div>`,
    });
  }

  async sendNewPassword(to, password) {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: config.get("authMail"),
    });

    await transporter.sendMail({
      from: "wonderful shop ✨ wonderful_project@inbox.ru",
      to,
      subject: "Восстановление пароля",
      text: "",
      html: `<div><h3>Вы изменили пароль<h3><h5>${password}</h5></div>`,
    });
  }
}

module.exports = new MailService();
