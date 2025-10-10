import { NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';


export async function POST(req: Request) {
const form = await req.formData();
const name = String(form.get('name') || '');
const email = String(form.get('email') || '');
const location = form.get('location') ? String(form.get('location')) : null;
const country = form.get('country') ? String(form.get('country')) : null;
const photoUrl = form.get('photoUrl') ? String(form.get('photoUrl')) : null;
const supports = form.get('supports') === 'yes';


await prisma.soldier.create({ data: { name, email, location, country, photoUrl, supports } });


return NextResponse.redirect(new URL('/mission-control', req.url));
}