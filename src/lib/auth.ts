import db from "@/db";
import users from "@/db/schemas/users";
import CustomUser from "@/types/CustomUser";
import { createHash } from "crypto";
import { and, eq } from "drizzle-orm";

export const getUserFromDB = async (
  username: string,
  password: string
): Promise<CustomUser | null> => {

  const hashedPassword = createHash('sha256').update(password).digest('hex');

  const result = await db
    .select({
      id: users.id,
      username: users.username,
      name: users.name,
      surname: users.surname,
    })
    .from(users)
    .where(and(eq(users.username, username), eq(users.password, hashedPassword)) );

  if (result.length === 0) return null;

  return {
    id: String(result[0].id),
    username: result[0].username,
    name: result[0].name,
    surname: result[0].surname,
  };

};
