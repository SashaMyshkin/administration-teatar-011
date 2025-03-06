import { auth } from "@/auth";
import db from "@/db";
import { ImageProps, images } from "@/db/schemas/images";
import { Communication } from "@/types/Communication";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communication: Communication = {
    success: false,
    message: "",
  };

  try {
    const session = await auth();
    if (!session) {
      communication.success = false;
      communication.message = "Nemate prava da pristupite ovoj ruti.";
      return NextResponse.json(communication, {
        status: 401,
        statusText: "Unauthorized request.",
      });
    }

    const id = parseInt(params.id);

    if (!Number.isInteger(id)) {
      communication.success = false;
      communication.message = "ID je parametar sa nevalidnom vrednošću.";
      return NextResponse.json(communication, { status: 400 });
    }

    const resultSet = await db.select().from(images).where(eq(images.id, id));

    communication.success = true;
    communication.message = "";
    communication.responseData = resultSet;

    return NextResponse.json(communication, { status: 200 });
  } catch (err) {
    communication.success = false;
    communication.message = "Desila se kritična greška";
    console.log(err);
    return NextResponse.json(communication, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communication: Communication = {
    success: false,
    message: "",
  };
  try {
    const session = await auth();
    if (!session) {
      communication.success = false;
      communication.message = "Nemate prava da pristupite ovoj ruti.";
      return NextResponse.json(communication, {
        status: 401,
        statusText: "Unauthorized request.",
      });
    }

    const imageId = parseInt(params.id);

    if (!imageId || isNaN(imageId)) {
      communication.success = false;
      communication.message = "Nevalidan id slike.";
      return NextResponse.json(communication, { status: 400 });
    }

    const formData = await request.json();
    const data: Partial<ImageProps> = {};
    if (formData.serverName) data.serverName = String(formData.serverName);
    if (formData.pathName) data.pathName = String(formData.pathName);
    if (formData.fileName) data.fileName = String(formData.fileName);
    if (formData.extension) data.extension = String(formData.extension);
    if (formData.width) data.width = parseInt(formData.width);
    if (formData.height) data.height = parseInt(formData.height);
    if (formData.size) data.size = parseInt(formData.size);
    if (formData.aspectRatio) data.aspectRatio = String(formData.aspectRatio);
    if (formData.visible) data.visible = parseInt(formData.visible);

    const updatedMember = await db
      .update(images)
      .set(data)
      .where(eq(images.id, imageId));

    communication.success = true;
    communication.message = "Podaci su uspešno izmenjeni.";
    communication.responseData = updatedMember;

    return NextResponse.json(communication, { status: 200 });
  } catch (error) {
    communication.success = false;
    communication.message = "Došlo je do kritične greške.";
    return NextResponse.json(communication, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  
  const communication: Communication = {
    success: false,
    message: "",
  };

  try {
    const session = await auth();
    if (!session) {
      communication.success = false;
      communication.message = "Nemate prava da pristupite ovoj ruti.";
      return NextResponse.json(communication, {
        status: 401,
        statusText: "Unauthorized request.",
      });
    }

    const imageId = parseInt(params.id); // Extract the paragraph ID from the URL

    if (!Number.isInteger(imageId)) {
      communication.success = false;
      communication.message = "ID je parametar sa nevalidnom vrednošću.";
      return NextResponse.json(communication, { status: 400 });
    }

    const res = await db
      .delete(images)
      .where(eq(images.id, imageId));

    communication.success = true;
    communication.message = "Slika je uspešno obrisan.";
    return NextResponse.json(communication, { status: 200 });
  } catch (err) {
    communication.success = false;
    communication.message = "Došlo je do kritične greške.";
    return NextResponse.json(communication, { status: 500 });
  }
}