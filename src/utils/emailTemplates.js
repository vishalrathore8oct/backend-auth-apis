export function emailTemplateForVerificationCode(verificationCode) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #4CAF50; text-align: center;">Verify Your Email Address</h2>
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">Thank you for signing up! To complete your registration, please use the following verification code:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #ffffff; padding: 12px 24px; border-radius: 5px; background-color: #4CAF50;">
              ${verificationCode}
            </span>
          </div>
          <p style="font-size: 16px; color: #333;">This code is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
          <p style="font-size: 16px; color: #333;">If you experience any issues, contact our support team.</p>
          <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
            <p>Best Regards,<br><strong>Your Company Name</strong></p>
            <p style="font-size: 12px; color: #aaa;">This is an automated email. Please do not reply.</p>
          </footer>
        </div>
      `;
}

export function emailTemplateForResetPasswordUrl(resetUrl) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #FF5733; text-align: center;">Reset Your Password</h2>
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">We received a request to reset your password. Click the button below to proceed:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetUrl}" style="display: inline-block; font-size: 18px; font-weight: bold; color: #fff; padding: 12px 24px; text-decoration: none; background-color: #FF5733; border-radius: 5px;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 16px; color: #333;">This link is valid for <strong>10 minutes</strong>. If you didn't request this, you can safely ignore this email.</p>
          <p style="font-size: 16px; color: #333;">Need help? Contact our support team.</p>
          <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
            <p>Best Regards,<br><strong>Your Company Name</strong></p>
            <p style="font-size: 12px; color: #aaa;">This is an automated email. Please do not reply.</p>
          </footer>
        </div>
      `;
}
