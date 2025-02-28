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
    const memberId = Number(formData.memberId);
    const scriptId = Number(formData.scriptId);
    const paragraph = String(formData.paragraph).trim();
    const orderNumber = Number(formData.orderNumber);

    if(Number.isNaN(memberId)){
      communication.success = false;
      communication.message = "Member ID je parametar sa nevalidnom vrednošću.";
      return Response.json(communication, { status: 400 });
    }

    if(Number.isNaN(scriptId)){
      communication.success = false;
      communication.message = "Script ID je parametar sa nevalidnom vrednošću.";
      return Response.json(communication, { status: 400 });
    }

    if(paragraph === ""){
      communication.success = false;
      communication.message = "Ne može se uneti prazan paragraf.";
      return Response.json(communication, { status: 400 });
    }

    if(Number.isNaN(orderNumber)){
      communication.success = false;
      communication.message = "orderNumber je parametar sa nevalidnom vrednošću.";
      return Response.json(communication, { status: 400 });
    }

    const newBiography = await db.insert(biographies).values({
      memberId: memberId,
      scriptId: scriptId,
      paragraph: paragraph,
      orderNumber: orderNumber
    });

    communication.success = true;
    communication.message = "Podaci su uspešno sačuvani.";
    communication.responseData = newBiography;
    return Response.json(communication, { status: 201 });
		
  } catch (err) {
    communication.success = false;
    communication.message = "Desila se kritična greška";
    console.log(err)
    return Response.json(communication, { status: 500 });
  }
}
