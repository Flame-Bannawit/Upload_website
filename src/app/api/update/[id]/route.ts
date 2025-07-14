// app/api/update/[id]/route.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import FormModel from '@/models/Form';

export async function PUT(req: NextRequest) {
  await dbConnect();

  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // ดึง id จาก URL

  const body = await req.json();
  const { details } = body;

  try {
    const updated = await FormModel.findByIdAndUpdate(id, { details }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
