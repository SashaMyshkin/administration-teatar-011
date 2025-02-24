import { auth } from "@/auth";
import db from "@/db";
import { mottos } from "@/db/schemas/mottos";
import { Communication } from "@/types/Communication";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const communication: Communication = {
    success: false,
    message: "",
  };

  try {
    const memberId = (await params).id; // Extract the member ID from the URL
    const formData = await request.json();

    const session = await auth();
    if (!session) {
      communication.success = false;
      communication.message = "Nemate prava da pristupite ovoj ruti.";
      return Response.json(communication, {
        status: 401,
        statusText: "Unauthorized request.",
      });
    }

    const updated = await db
      .update(mottos)
      .set({
        motto: formData.motto,
      })
      .where(eq(mottos.id, formData.id));

    communication.success = true;
    communication.message = "Podaci su uspešno izmenjeni.";
    communication.responseData = updated;

		return NextResponse.json(communication, { status: 200 });

  } catch (err) {
    communication.success = false;
    communication.message = "Došlo je do kritične greške.";
    return NextResponse.json(communication, { status: 500 });
  } 
}
