import { auth } from "@/auth";
import db from "@/db";
import { members } from "@/db/schemas/members";
import { membershipStatus } from "@/db/schemas/membershipStatus";
import { convertToDbDate } from "@/lib/validation";
import { Communication } from "@/types/Communication";
import { and, like, eq } from "drizzle-orm"; // Import filtering functions
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return Response.json({ resultSet: [] });

  const id = Number((await params).id);

  if (Number.isNaN(id)) return Response.json({ resultSet: [] });

  const resultSet = await db
    .select()
    .from(members)
    .innerJoin(
      membershipStatus,
      eq(membershipStatus.id, members.membershipStatus)
    )
    .where(eq(members.id, id));

  return Response.json({ resultSet });
}

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

    if (!memberId || isNaN(Number(memberId))) {
      communication.success = false;
      communication.message = "Nevalidan id člana.";
      return NextResponse.json(communication, { status: 400 });
    }

    const dateOfBirth = formData.dateOfBirth
      ? new Date(convertToDbDate(formData.dateOfBirth))
      : null;
    const dateOfJoining = formData.dateOfJoining
      ? new Date(convertToDbDate(formData.dateOfJoining))
      : null;
    const exitDate = formData.exitDate
      ? new Date(convertToDbDate(formData.exitDate))
      : null;

    // Update the member record in the `members` table
    const updatedMember = await db
      .update(members)
      .set({
        name: formData.name,
        nameCyr: formData.nameCyr || null,
        surname: formData.surname,
        surnameCyr: formData.surnameCyr || null,
        email: formData.email || null,
        dateOfBirth: dateOfBirth || null,
        dateOfJoining: dateOfJoining || null,
        exitDate: exitDate || null,
        identifier: formData.identifier || null,
        membershipStatus: formData.membershipStatus,
        active: formData.active,
      })
      .where(eq(members.id, Number(memberId))); // Ensure the ID matches

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
