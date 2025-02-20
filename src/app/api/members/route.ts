import { auth } from "@/auth";
import db from "@/db";
import { members } from "@/db/schemas/members";
import { and, like } from "drizzle-orm"; // Import filtering functions

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

export async function GET(request: Request) {
  const session = await auth();
  if (!session) return [];

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
    statusFilter ? like(members.membershipStatus, `%${statusFilter}%`) : undefined,
    activeFilter ? like(members.active, `%${activeFilter}%`) : undefined
  );

  const resultSet = await db
    .select()
    .from(members)
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

  const count = await db.$count(members, conditions);

  return Response.json({ resultSet, count });
}
