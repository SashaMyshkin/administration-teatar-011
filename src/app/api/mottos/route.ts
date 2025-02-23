import { auth } from "@/auth";
import db from "@/db";
import { mottos } from "@/db/schemas/mottos";
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

    const newMotto = db.insert(mottos).values({
      memberId: formData.memberId,
      scriptId: formData.scriptId,
      motto: formData.motto,
    });

    communication.success = true;
    communication.message = "Podaci su uspešno sačuvani.";
    communication.responseData = newMotto;
    return Response.json(communication, { status: 201 });
		
  } catch (err) {
    communication.success = false;
    communication.message = "Desila se kritična greška";
    return Response.json(communication, { status: 500 });
  }
}
