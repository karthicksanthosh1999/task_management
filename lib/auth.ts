import { getServerSession } from "next-auth";
import { GET as authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getSession = () => getServerSession(authOptions);
