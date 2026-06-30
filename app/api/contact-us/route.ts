import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_hAMpwt8y_3yWAULKoA7V6rPPvgm6PQNAK');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, organisation, email, phone, message, captchaToken } = body;

    if (!captchaToken) {
      return NextResponse.json({ success: false, error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // 1. Send email to internal team
    const internalHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 4px; background-color: #ffffff;">
        <div style="background-color: #081226; color: #ffffff; padding: 20px; text-align: center; border-radius: 4px 4px 0 0;">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: 2px;">ARVENTIS PARTNERS</h1>
          <p style="margin: 5px 0 0 0; font-style: italic; font-size: 12px; color: #c5a880;">New Client Mandate Enquiry</p>
        </div>
        <div style="padding: 20px; color: #081226; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Organisation:</td>
              <td style="padding: 8px 0;">${organisation || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #faf6ee; border-left: 4px solid #c5a880; border-radius: 2px;">
            <strong style="display: block; margin-bottom: 8px; color: #081226;">Enquiry Parameters / Message:</strong>
            <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #333333;">${message}</p>
          </div>
        </div>
        <div style="padding: 15px; text-align: center; font-size: 11px; color: #888888; border-top: 1px solid #eeeeee; margin-top: 20px;">
          Processed under strict NDA protocols. © 2026 Arventis Partners.
        </div>
      </div>
    `;

    // 2. Send "Thank You" email to the user
    const userHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 4px; background-color: #ffffff;">
        <div style="background-color: #081226; color: #ffffff; padding: 20px; text-align: center; border-radius: 4px 4px 0 0;">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: 2px;">ARVENTIS PARTNERS</h1>
        </div>
        <div style="padding: 30px 20px; color: #081226; line-height: 1.6;">
          <h2 style="color: #081226; font-size: 18px; margin-bottom: 20px;">Thank You for Your Interest</h2>
          <p>Dear ${name},</p>
          <p>We have successfully received your inquiry. Thank you for considering Arventis Partners for your strategic and legal needs.</p>
          <p>Our team will review your message and a partner will be in touch with you shortly to discuss your mandate.</p>
          <p style="margin-top: 30px;">Best regards,<br/><strong>The Arventis Partners Team</strong></p>
        </div>
        <div style="padding: 15px; text-align: center; font-size: 11px; color: #888888; border-top: 1px solid #eeeeee; margin-top: 20px;">
          This is an automated message. Please do not reply directly to this email.<br/>
          Processed under strict NDA protocols. © 2026 Arventis Partners.
        </div>
      </div>
    `;

    // Fire both emails concurrently
    const [internalRes, userRes] = await Promise.all([
      resend.emails.send({
        from: 'contact@arventispartners.com',
        to: 'arventis-partners@googlegroups.com',
        subject: `[New Mandate Enquiry] ${name}`,
        html: internalHtmlContent,
      }),
      resend.emails.send({
        from: 'contact@arventispartners.com',
        to: email,
        subject: 'Thank You for Your Interest - Arventis Partners',
        html: userHtmlContent,
      })
    ]);

    if (internalRes.error) {
      console.error('Failed to send internal email:', internalRes.error);
    }
    if (userRes.error) {
      console.error('Failed to send user email:', userRes.error);
    }

    return NextResponse.json({ success: true, internalId: internalRes.data?.id, userId: userRes.data?.id });
  } catch (error: any) {
    console.error('Resend Email Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
