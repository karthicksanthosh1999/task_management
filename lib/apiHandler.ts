import { IResponseType } from "@/app/types/reponseType";
import { NextResponse } from "next/server";

export const successMessage = <T>(
  statusCode = 200,
  data: T,
  message = "Success"
) => {
  return NextResponse.json<IResponseType<T>>(
    { success: true, message, data, statusCode },
    { status: statusCode }
  );
};

export const warningMessage = (message = "Failed", statusCode = 400) => {
  return NextResponse.json<IResponseType>(
    { success: false, message, statusCode },
    { status: statusCode }
  );
};

export const errorMessage = (
  message = "Internal Server Error",
  statusCode = 500,
  error?: string
) => {
  return NextResponse.json<IResponseType>(
    { success: false, message, statusCode, error },
    { status: statusCode }
  );
};
