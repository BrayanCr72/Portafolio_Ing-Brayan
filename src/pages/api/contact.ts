
export const prerender = false

import type { APIRoute } from 'astro';
import { resend } from '../../lib/resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, contactType, message, company, position, projectType } = body;

    // Construir secciones opcionales del correo
    const companySection = company
      ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 140px;">Empresa</td><td style="padding: 8px 0; color: #e2e8f0; font-size: 13px;">${company}</td></tr>`
      : '';

    const positionSection = position
      ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Cargo</td><td style="padding: 8px 0; color: #e2e8f0; font-size: 13px;">${position}</td></tr>`
      : '';

    const projectTypeSection = projectType
      ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Tipo de proyecto</td><td style="padding: 8px 0; color: #e2e8f0; font-size: 13px;">${projectType}</td></tr>`
      : '';

    const contactTypeLabel =
      contactType === 'company' ? '🏢 Empresa' :
      contactType === 'freelance' ? '💼 Freelance / Proyecto personal' :
      contactType;

    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed, #ec4899, #eab308); border-radius: 16px 16px 0 0; padding: 36px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                📬 Nuevo mensaje de contacto
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
                Portafolio — Ing. Brayan Ordoñez
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color: #1e293b; padding: 36px 40px; border-radius: 0 0 16px 16px;">

              <!-- Remitente -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 20px;">
                    <p style="margin: 0 0 4px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">De</p>
                    <p style="margin: 0; color: #f1f5f9; font-size: 20px; font-weight: 700;">${name}</p>
                    <a href="mailto:${email}" style="color: #a78bfa; font-size: 14px; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Detalles -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid #1e293b; margin-bottom: 12px;">
                    <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Detalles del contacto</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 140px;">Tipo de contacto</td>
                  <td style="padding: 8px 0;">
                    <span style="background-color: #4c1d95; color: #c4b5fd; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 20px;">
                      ${contactTypeLabel}
                    </span>
                  </td>
                </tr>
                ${companySection}
                ${positionSection}
                ${projectTypeSection}
              </table>

              <!-- Mensaje -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensaje</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #0f172a; border-left: 3px solid #7c3aed; border-radius: 0 8px 8px 0; padding: 20px 24px;">
                    <p style="margin: 0; color: #cbd5e1; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #ffffff; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 50px; text-decoration: none;">
                      Responder a ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; color: #475569; font-size: 12px;">
                Este correo fue generado automáticamente desde el portafolio de 
                <span style="color: #7c3aed;">Ing. Brayan Ordoñez</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { error } = await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>', // cambia por tu dominio verificado
      to: ['ordonezbrayan62@gmail.com'],
      subject: `📬 Nuevo mensaje de ${name} — ${contactTypeLabel}`,
      replyTo: email,
      html,
    });

    if (error) {
      return new Response(JSON.stringify({ ok: false, error }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: 'Error interno' }), { status: 500 });
  }
};