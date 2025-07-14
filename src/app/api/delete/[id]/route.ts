// app/api/delete/[id]/route.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import FormModel from '@/models/Form';

export async function DELETE(req: NextRequest) {
  await dbConnect();

  // ดึง id จาก URL
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // หรือใช้ regex ก็ได้

  try {
    await FormModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
