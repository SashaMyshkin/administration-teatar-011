import { User } from "next-auth";

interface CustomUser extends User {
  id?: string
  name?: string | null
  surname?:string | null
  username?:string | null
  email?: string | null
}

export default CustomUser
