import { auth } from "@/auth";
import db from "@/db";
import { membershipStatus } from "@/db/schemas/membershipStatus";

export async function GET() {
  const session = await auth();
  if (!session) return Response.json([]);

  try {
    const resultSet = await db.select().from(membershipStatus);

    return Response.json({ resultSet });
  } catch (err) {
    console.log(err);
    return Response.json([]);
  }
}
