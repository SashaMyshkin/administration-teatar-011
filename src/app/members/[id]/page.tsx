import db from "@/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import MemberTabs from "@/app/components/membersUI/MemberTabs";
import { AlertProvider } from "@/app/components/AlertProvider";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  



  return (
    <></>
  );
}
