import db from "@/db";
import { eq } from "drizzle-orm";
import { members } from "@/db/schemas/members";
import { membershipStatus } from "@/db/schemas/membershipStatus";
import { notFound } from "next/navigation";
import MemberTabs from "@/app/components/membersUI/MemberTabs";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const idParam = (await params).id;
  const id = Number((await params).id);

  if (Number.isNaN(id) && idParam !== "new") return notFound();

  const resultMembershipStatus = await db.select().from(membershipStatus);

  if (idParam === "new")
    return <MemberTabs coreInfo={null} membershipStatus={resultMembershipStatus} />;

  const resultMember = await db
    .select()
    .from(members)
    .where(eq(members.id, id));

  return (
    <MemberTabs
      coreInfo={resultMember[0]}
      membershipStatus={resultMembershipStatus}
    />
  );
}
