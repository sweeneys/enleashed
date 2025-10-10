import { NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';


export async function POST(req: Request) {
const form = await req.formData();
const url = String(form.get('url') || '');
const name = form.get('name') ? String(form.get('name')) : null;
const email = form.get('email') ? String(form.get('email')) : null;
if (!url) return NextResponse.redirect(new URL('/mission-control', req.url));
await prisma.playlistSuggestion.create({ data: { url, name, email } });
return NextResponse.redirect(new URL('/mission-control', req.url));
}