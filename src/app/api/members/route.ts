import { auth } from "@/auth";
import db from "@/db";
import { convertToDbDate } from "@/lib/validation";
import { Communication } from "@/types/Communication";
import { and, like, eq } from "drizzle-orm"; // Import filtering functions
import { NextResponse } from "next/server";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

export async function GET(request: Request) {
  /*const session = await auth();
  if (!session) return Response.json([]);

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const offsetParam = Number(searchParams.get("offset") ?? DEFAULT_OFFSET);
  const limitParam = Number(searchParams.get("limit") ?? DEFAULT_LIMIT);
  const offset = Number.isNaN(offsetParam) ? DEFAULT_OFFSET : offsetParam;
  const limit = Number.isNaN(limitParam) ? DEFAULT_LIMIT : limitParam;

  // Extract filter parameters
  const nameFilter = searchParams.get("name") ?? "";
  const surnameFilter = searchParams.get("surname") ?? "";
  const statusFilter = searchParams.get("membershipStatus") ?? "";
  const activeFilter = searchParams.get("active") ?? "";

  // Apply filtering conditions if parameters are provided
  const conditions = and(
    nameFilter ? like(members.name, `%${nameFilter}%`) : undefined,
    surnameFilter ? like(members.surname, `%${surnameFilter}%`) : undefined,
    statusFilter
      ? like(members.membershipStatus, `%${statusFilter}%`)
      : undefined,
    activeFilter ? like(members.active, `%${activeFilter}%`) : undefined
  );

  const resultSet = await db
    .select({
      id: members.id,
      name: members.name,
      surname: members.surname,
      active: members.active,
      membershipStatus: membershipStatus.status,
    })
    .from(members)
    .innerJoin(
      membershipStatus,
      eq(membershipStatus.id, members.membershipStatus)
    )
    .where(conditions)
    .orderBy(members.dateOfJoining)
    .limit(limit)
    .offset(offset);

  /*console.log("QUERY: ", db
    .select()
    .from(members)
    .where(conditions) // Apply filters
    .limit(limit)
    .offset(offset).toSQL())*/

  /*const count = await db.$count(members, conditions);*/

  return Response.json({  });
}

/*export async function POST(request: Request) {
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

    const dateOfBirth = formData.dateOfBirth
      ? new Date(convertToDbDate(formData.dateOfBirth))
      : null;
    const dateOfJoining = formData.dateOfJoining
      ? new Date(convertToDbDate(formData.dateOfJoining))
      : null;
    const exitDate = formData.exitDate
      ? new Date(convertToDbDate(formData.exitDate))
      : null;

    // Insert the form data into the `members` table
    const newMember = await db.insert(members).values({
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
      active: formData.active || 0,
    });

    communication.success = true;
    communication.message = "Podaci su uspešno sačuvani.";
    communication.responseData = newMember;
    return Response.json(communication, { status: 201 });
  } catch (error) {
    communication.success = false;
    communication.message = "Desila se kritična greška";
    return Response.json(communication, { status: 500 });
  }
}*/
