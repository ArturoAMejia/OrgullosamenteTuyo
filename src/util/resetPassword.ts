import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async (
  email: string,
  nombre: string,
  token: string
) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  await transport.sendMail({
    from: '"Embajadores Ambientales" <admin@embajadores-ambientales.com>',
    to: email,
    subject: "Embajadores Ambientales - Resturación de contraseña",
    text: "Resturación de contraseña",
    html: `
    <p>Hola ${nombre}, restaura tu contraseña</p>
    <a href="${process.env.NEXTAUTH_URL}/restaurar/${token}">Restaurar contraseña</a>

    <p>Si no solicitaste restaurar tu contraseña ignora este mensaje</p>
    `,
  });
};
