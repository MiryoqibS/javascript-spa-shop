import nodemailer from "nodemailer";
import { ENV } from "../config/ENV.js";
import { capitalize } from "../utils/capitalize.js";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: ENV.SMTP_HOST,
            port: ENV.SMTP_PORT,
            auth: {
                user: ENV.SMTP_USER,
                pass: ENV.SMTP_PASS,
            }
        });
    }

    // == отправление письма с ссылкой подтверждения аккаунта ==
    async sendVerificationLink({ link, username, email }) {
        await this.transporter.sendMail({
            from: ENV.SMTP_USER,
            to: email,
            subject: "Подтвердите аккаунт",
            html:
                `
                <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                    <h2>${capitalize(username)} Добро пожаловать в HabitTracker!</h2>
                    <p>Чтобы завершить регистрацию, нажмите на кнопку ниже:</p>
                    <a href="${link}" 
                       style="display: inline-block; padding: 10px 20px; background: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">
                       Подтвердить аккаунт
                    </a>
                    <p>Если вы не регистрировались — просто проигнорируйте это письмо.</p>
                </div>
                `,
        });
    }
};

export const mailService = new MailService();