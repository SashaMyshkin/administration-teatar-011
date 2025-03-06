import { auth } from "@/auth";
import db from "@/db";
import { images } from "@/db/schemas/images";
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
    const serverName = String(formData.serverName);
    const pathName = String(formData.pathName);
    const fileName = String(formData.fileName);
    const extension = String(formData.extension);
    const width = Number(formData.width);
    const height = Number(formData.height);
    const size = Number(formData.size);
    const aspectRatio = String(formData.aspectRatio);
    const visible = Number(formData.visible);

    const newImage = await db.insert(images).values({
      serverName,
      pathName,
      fileName,
      extension,
      width,
      height,
      size,
      aspectRatio,
      visible,
    });

    communication.success = true;
    communication.message = "Podaci su uspešno sačuvani.";
    communication.responseData = newImage;
    return Response.json(communication, { status: 201 });
  } catch (err) {
    communication.success = false;
    communication.message = "Desila se kritična greška";
    console.log(err);
    return Response.json(communication, { status: 500 });
  }
}
