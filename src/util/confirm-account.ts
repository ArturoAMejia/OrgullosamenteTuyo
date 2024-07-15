import { Resend } from "resend";

export const sendNotificationConfirmAccount = async (
  email: string,
  nombre: string,
  token: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "admin@embajadores-ambientales.com",
    to: email,
    subject: "Embajadores Ambientales - Confirmación de la cuenta",
    html: `
    <p>Hola ${nombre}, confirma tu cuenta</p>
    <a href="${process.env.NEXTAUTH_URL}/confirmar-cuenta/${token}">Confirmar cuenta</a>`,
  });
};
