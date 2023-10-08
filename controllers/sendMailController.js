const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const speakeasy = require("speakeasy");

// Tao OTP
const secret = speakeasy.generateSecret({ length: 20 });
const tokenOtp = speakeasy.totp({
  secret: secret.base32,
  encoding: "base32",
});

const GOOGLE_MAILER_CLIENT_ID =
  "1050100437442-376jt1tr0ekajqdnsivf6f5l4nrhagfk.apps.googleusercontent.com";
const GOOGLE_MAILER_CLIENT_SECRET = "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";
const GOOGLE_MAILER_REFRESH_TOKEN =
  "1//04JsqmGuMlEbzCgYIARAAGAQSNwF-L9IrqdS_RsIAfluy_utms25bNRsoI3RocYnSsPnBS2NXXZzUMNPQ2s1agwR9p96MiPSUuEM";
// const GOOGLE_MAILER_REFRESH_TOKEN =
//   "1//04qUhZW2KXC5BCgYIARAAGAQSNwF-L9IrhmAdrBFXFsQ0HZlKD4an_2dgiwGk168FFdekZO0O8w-Kkt3XNPyxwGE8ttXKq9LCRFg";
const ADMIN_EMAIL_ADDRESS = "quyenmeomeo111@gmail.com";

// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);

// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

const sendMailController = {
  sendMail: async (req, res) => {
    try {
      // Lấy thông tin gửi lên từ client qua body
      const { email } = req.body;
      const subject = `${tokenOtp} is your verification code`;
      const content = `${tokenOtp} is your verification code`;
      if (!email) throw new Error("Please provide email!");
      /**
       * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
       * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
       */
      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
      const myAccessToken = myAccessTokenObject?.token;
      // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: ADMIN_EMAIL_ADDRESS,
          clientId: GOOGLE_MAILER_CLIENT_ID,
          clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });
      // mailOption là những thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email, // Gửi đến ai?
        subject: subject, // Tiêu đề email
        html: `<h3>${content}</h3>`, // Nội dung email
      };
      // Gọi hành động gửi email
      const data = await transport.sendMail(mailOptions);
      // Không có lỗi gì thì trả về success
      res
        .status(200)
        .json({ message: "Email sent successfully.", data: tokenOtp });
    } catch (error) {
      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
      console.log(error);
      res.status(500).json({ errors: error.message });
    }
  },
};

module.exports = sendMailController;
