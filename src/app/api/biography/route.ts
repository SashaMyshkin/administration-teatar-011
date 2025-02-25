import { auth } from "@/auth";
import db from "@/db";
import { biographies } from "@/db/schemas/biographies";
import { Communication } from "@/types/Communication";

export async function POST(request: Request) {
  const communication: Communication = {
    success: false,
    message: "",
  };

  try {
    const session = await auth();
    if (!session) {
      communication.success = false;
      communication.message = "Nemate prava da pristupite ovoj ruti.";
      return Response.json(communication, {
        status: 401,
        statusText: "Unauthorized request.",
      });
    }

    const formData = await request.json();

    const newBiography = await db.insert(biographies).values({
      memberId: formData.memberId,
      scriptId: formData.scriptId,
      paragraph: formData.paragraph,
      orderNumber: formData.paragraph
    });

    communication.success = true;
    communication.message = "Podaci su uspešno sačuvani.";
    communication.responseData = newBiography;
    return Response.json(communication, { status: 201 });
		
  } catch (err) {
    communication.success = false;
    communication.message = "Desila se kritična greška";
    return Response.json(communication, { status: 500 });
  }
}
