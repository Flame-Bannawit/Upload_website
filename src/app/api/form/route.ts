import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Form from "@/models/Form";

// POST: บันทึกข้อมูล
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const { mainUnit, subUnit, date, details } = body;

    if (!mainUnit || !date || !details) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newForm = await Form.create({
      mainUnit,
      subUnit,
      date,
      details,
    });

    return NextResponse.json({ success: true, data: newForm });
  } catch (error: any) {
    console.error("❌ Error in POST /api/form:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ GET: ดึงข้อมูลทั้งหมด
export async function GET() {
  try {
    await dbConnect();
    const forms = await Form.find().sort({ date: -1 });
    return NextResponse.json({ success: true, data: forms });
  } catch (error: any) {
    console.error("❌ Error in GET /api/form:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
