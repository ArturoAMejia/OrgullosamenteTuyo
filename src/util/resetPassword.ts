import { Resend } from "resend";

export const sendResetPasswordEmail = async (
  email: string,
  nombre: string,
  token: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "admin@embajadores-ambientales.com",
    to: email,
    subject: "Embajadores Ambientales - Resturación de contraseña",
    html: `
    <p>Hola ${nombre}, restaura tu contraseña</p>
    <a href="${process.env.NEXTAUTH_URL}/restaurar/${token}">Restaurar contraseña</a>

    <p>Si no solicitaste restaurar tu contraseña ignora este mensaje</p>`,
  });
};
