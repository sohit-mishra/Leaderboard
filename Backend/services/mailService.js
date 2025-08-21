const nodemailer = require("nodemailer");
const env = require("../config/env");

const transporter = nodemailer.createTransport({
  service: env.EMAIL_SERVICE,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const sendResetEmail = async (email, name, resetUrl) => {
  const mailOptions = {
    from: env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 10px 20px; margin: 10px 0; 
                  background-color: #4CAF50; color: #fff; text-decoration: none; 
                  border-radius: 5px;">
           Reset Password
        </a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p style="font-size: 0.9em; color: #777;">This link will expire in 1 hour.</p>
        <hr>
        <p style="font-size: 0.8em; color: #999;">
          © ${new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Mail sent ");
};

module.exports = sendResetEmail;
