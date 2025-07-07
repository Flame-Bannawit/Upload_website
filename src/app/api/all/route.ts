// src/app/api/all/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Form from '@/models/Form';

export async function GET() {
  try {
    await dbConnect(); // เชื่อมต่อ MongoDB

    const data = await Form.find().sort({ date: -1 }); // ดึงข้อมูลเรียงวันที่ใหม่สุดก่อน
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Error in GET /api/all:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
