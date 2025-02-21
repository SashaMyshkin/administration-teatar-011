import { auth } from "@/auth";
import db from "@/db";
import { members } from "@/db/schemas/members";
import { membershipStatus } from "@/db/schemas/membershipStatus";
import { and, like, eq } from "drizzle-orm"; // Import filtering functions

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return Response.json({ resultSet:[] });

  const id = Number((await params).id);

  if (Number.isNaN(id)) return Response.json({ resultSet:[] });

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
