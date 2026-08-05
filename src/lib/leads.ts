import { SITE } from "./site";

/**
 * Envio de formulários em hospedagem estática (cPanel/HostGator) via FormSubmit.
 * Os dados chegam no e-mail configurado em SITE.email.
 *
 * IMPORTANTE: no primeiro envio o FormSubmit manda um e-mail de ativação para
 * SITE.email. Basta clicar no link de confirmação uma única vez.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

export async function sendLead(
  subject: string,
  fields: Record<string, string>,
): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        ...fields,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
