// app/api/update/[id]/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import FormModel from '@/models/Form';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;
  const body = await req.json();
  const { details } = body;

  try {
    const updated = await FormModel.findByIdAndUpdate(id, { details }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
