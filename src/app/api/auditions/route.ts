import { NextRequest, NextResponse } from "next/server";
import { parseISO, isValid } from "date-fns";
import pool from "@lib/db";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = Math.max(0, Number(searchParams.get("page") || 0));
  const limit = Math.min(
    100,
    Math.max(1, Number(searchParams.get("limit") || 25)),
  );

  const startDate =
    searchParams.has("startDate") &&
    isValid(parseISO(searchParams.get("startDate") ?? ""))
      ? searchParams.get("startDate")
      : null;

  const isOpen =
    searchParams.has("isOpen") &&
    !Number.isNaN(Number(searchParams.get("isOpen")))
      ? searchParams.get("isOpen")
      : null;

  const finished =
    searchParams.has("finished") &&
    !Number.isNaN(Number(searchParams.get("finished")))
      ? searchParams.get("finished")
      : null;

  let sqlQuery = `
    SELECT a.id, 
        auditionTypeId, 
        at.type auditionType,
        apt.type presentationType,
        presentationTypeId, 
        startDate, 
        endDate, 
        deadLine, 
        auditionTime, 
        enrollmentDateTime, 
        membershipFee, 
        uniqueKey, 
        isOpen, 
        finished 
    FROM audition a
    INNER JOIN auditionPresentationType apt on apt.id = a.presentationTypeId
    INNER JOIN auditionType at on at.id = a.auditionTypeId
    WHERE 1=1
  `;

  const params = [];

  if (startDate) {
    sqlQuery += ` AND startDate = ?`;
    params.push(startDate);
  }

  if (isOpen) {
    sqlQuery += ` AND isOpen = ?`;
    params.push(isOpen);
  }

  if (finished) {
    sqlQuery += ` AND finished = ?`;
    params.push(finished);
  }

  sqlQuery += " ORDER BY startDate";
  sqlQuery += ` LIMIT ?`;
  params.push(limit);

  sqlQuery += ` OFFSET ?`;
  params.push(page);

  try {
    const [rows,] = await pool.query(sqlQuery, params);
    const response = {
      error: false,
      data: {
        rows,
      },
    };
    return NextResponse.json(response);
  } catch (error) {

    console.error("Database query failed:", error);
    const response = {
      error: true,
      message: "An error occurred while processing your request.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
