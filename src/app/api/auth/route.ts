import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import CryptoJS from 'crypto-js';

export async function POST(request: Request) {
  const communication: Communication = {
    error: false,
    message: "",
  };

  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password") as string;

    if (!username || !password) {
      communication.error = true;
      communication.message = "Korisničko ime i lozinka su obavezni podaci";
      return Response.json(communication);
    }

    let sqlQuery = "";
    const params = [];

    sqlQuery = `
            SELECT id,
                name,
                surname,
                username,
                roles
            FROM users
            WHERE 1=1
            AND username = ?
        `;
    params.push(username);

    sqlQuery += "AND password = ?";
    params.push(CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex));

  

    const [rows] = await pool.query(sqlQuery, params);

    if(Array.isArray(rows) && rows.length === 0) {
        communication.error = true;
        communication.message = "Neispravni kredencijali.";
        return Response.json(communication, {status:401});
    }


    // Generate JWT token
    const token = jwt.sign({}, process.env.AUTH_SECRET??"", {
        expiresIn: '1h',
    });

    // Set the token in an HTTP-only cookie
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`;

    communication.error = false;
    communication.message = "Uspešno logovanje";
    communication.data = rows;

    const responseInit:ResponseInit = {
        status:200,
        headers:{
            "set-cookie":cookie
        }
    }

    return Response.json(communication, responseInit);




    
    
  } catch (err) {
    console.log(err);
    communication.error = true;
    communication.message = "Desila se nepoznata greška.";
    return Response.json(communication, {status:500});
  }
}
