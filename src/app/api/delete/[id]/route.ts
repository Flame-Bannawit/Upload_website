// app/api/delete/[id]/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import FormModel from '@/models/Form';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;

  try {
    await FormModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
