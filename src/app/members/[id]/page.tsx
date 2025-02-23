import db from "@/db";
import { eq } from "drizzle-orm";
import { members } from "@/db/schemas/members";
import { membershipStatus } from "@/db/schemas/membershipStatus";
import { notFound } from "next/navigation";
import MemberTabs from "@/app/components/membersUI/MemberTabs";
import { AlertProvider } from "@/app/components/AlertProvider";
import { scripts } from "@/db/schemas/scripts";
import { mottos } from "@/db/schemas/mottos";

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
    return (
      <AlertProvider>
        <MemberTabs coreInfo={null} membershipStatus={resultMembershipStatus} scripts={null} mottos={null}/>
      </AlertProvider>
    );

  const resultMember = await db
    .select()
    .from(members)
    .where(eq(members.id, id));

  const resultScripts = await db.select().from(scripts);
  const resultMotto = await db.select().from(mottos).where(eq(mottos.memberId, id))

  return (
    <AlertProvider>
      <MemberTabs
        coreInfo={resultMember[0]}
        membershipStatus={resultMembershipStatus}
        scripts={resultScripts}
        mottos={resultMotto}
      />
    </AlertProvider>
  );
}
