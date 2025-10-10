import { NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';
import { ChiefRole } from '@prisma/client';


export async function POST(req: Request) {
const form = await req.formData();
const role = form.get('role') as keyof typeof ChiefRole;
const name = String(form.get('name') || '');
const email = String(form.get('email') || '');
const photoUrl = form.get('photoUrl') ? String(form.get('photoUrl')) : null;
const responsibilities = String(form.get('responsibilities') || '');
const pitch = String(form.get('pitch') || '');


await prisma.chiefApplication.create({
data: { role: ChiefRole[role], name, email, photoUrl, responsibilities, pitch },
});


return NextResponse.redirect(new URL('/mission-control', req.url));
}