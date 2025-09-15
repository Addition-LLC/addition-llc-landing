import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    const values = {
      email: String(form.get('email') || ''),
      projectName: String(form.get('projectName') || ''),
      projectDescription: String(form.get('projectDescription') || ''),
      loomVideoLink: String(form.get('loomVideoLink') || ''),
      targetUserBase: String(form.get('targetUserBase') || ''),
      userProblem: String(form.get('userProblem') || ''),
      targetAgeRange: String(form.get('targetAgeRange') || ''),
      projectType: form.getAll('projectType').map(String),
      features: String(form.get('features') || ''),
      preferredTechStack: String(form.get('preferredTechStack') || ''),
      designGuidelines: String(form.get('designGuidelines') || ''),
      technicalRequirements: String(form.get('technicalRequirements') || ''),
      startDate: String(form.get('startDate') || ''),
      endDate: String(form.get('endDate') || ''),
      maintenancePlan: String(form.get('maintenancePlan') || ''),
      userTrainingRequired: String(form.get('userTrainingRequired') || ''),
      thirdPartyIntegration: String(form.get('thirdPartyIntegration') || ''),
      thirdPartyServices: String(form.get('thirdPartyServices') || ''),
      competitors: String(form.get('competitors') || ''),
      competitiveDifferentiation: String(form.get('competitiveDifferentiation') || ''),
      contactName: String(form.get('contactName') || ''),
      contactInfo: String(form.get('contactInfo') || ''),
    };

    const text = JSON.stringify(values, null, 2);

    const { error } = await resend.emails.send({
      from: 'Addition Forms <forms@yourdomain.com>',
      to: ['mikiasyonas512@gmail.com'],
      replyTo: values.email || undefined,
      subject: 'New Project Requirements Submission',
      text,
      html: `<pre>${text.replace(/</g, '&lt;')}</pre>`,
    });

    if (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message ?? 'Unknown error' }), { status: 500 });
  }
};
