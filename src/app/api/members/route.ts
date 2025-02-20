import { auth } from "@/auth";
import db from "@/db";
import { members } from "@/db/schemas/members";

//export const dynamic = "force-static";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

export async function GET(request: Request) {
  const session = await auth();

  if (!session) return [];

  const url = new URL(request.url);
  const searchParams = url.searchParams;
	
  const offsetParam = Number(searchParams.get("offset")??DEFAULT_OFFSET);
  const limitParam = Number(searchParams.get("limit")??DEFAULT_LIMIT);
	
  const offset = Number.isNaN(offsetParam) ? DEFAULT_OFFSET : offsetParam;
  const limit = Number.isNaN(limitParam) ? DEFAULT_LIMIT : limitParam;

  const resultSet = await db.select().from(members).limit(limit).offset(offset);
	const count = await db.$count(members);

	return Response.json({ resultSet, count });
}
