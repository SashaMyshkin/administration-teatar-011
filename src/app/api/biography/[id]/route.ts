import { auth } from "@/auth";
import db from "@/db";
import { biographies } from "@/db/schemas/biographies";
import { mottos } from "@/db/schemas/mottos";
import { Communication } from "@/types/Communication";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { biographyProps } from "@/db/schemas/biographies";

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

    // Create a data object and only include defined properties
    const data: Partial<biographyProps> = {}; // Infer schema type

    if (formData.paragraph !== undefined) {
      data.paragraph = formData.paragraph;
    }

    if (formData.orderNumber !== undefined) {
      data.orderNumber = formData.orderNumber;
    }

    // Ensure there's something to update
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { success: false, message: "Nema podataka za ažuriranje." },
        { status: 400 }
      );
    }
    const updated = await db
      .update(biographies)
      .set(data)
      .where(eq(biographies.id, formData.id));

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
