import { NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';

export async function POST(req: Request) {
  const form = await req.formData();

  const name = String(form.get('name') || '');
  const email = String(form.get('email') || '');
  const photoUrl = form.get('photoUrl') ? String(form.get('photoUrl')) : null;
  const responsibilities = form.get('responsibilities')
    ? String(form.get('responsibilities'))
    : null;

  await prisma.corporal.create({
    data: {
      name,
      email,
      photoUrl,
      responsibilities,
    },
  });

  // Redirect back to Mission Control after submission
  return NextResponse.redirect(new URL('/mission-control', req.url));
}
