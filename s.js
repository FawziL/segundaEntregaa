const nodemailer = require("nodemailer")


const TEST_MAIL = "francesca.howell64@ethereal.email";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'francesca.howell64@ethereal.email',
        pass: '1GKBq27swN2228NXE9'
    }
});

const mailOptions = {
  from: "Servidor Node",
  to: TEST_MAIL,
  subject: "PRUEBAAAAAAAAAAAAAAAAAAAAAAAAAAAXDDDD",
  html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
};

async function enviarInfo() {
  const info = await transporter.sendMail(mailOptions);
  console.log(info);
}
try {
  enviarInfo()
} catch (error) {
  console.log(error);
}