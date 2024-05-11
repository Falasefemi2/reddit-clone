/** @format */

"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./libs/db";
import { Prisma } from "@prisma/client";

export async function updateUsername(prevState: any, formData: FormData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return redirect("/api/auth/login");
    }

    const username = formData.get("username") as string;
    await prisma.user.update({
      where: { id: user.id },
      data: { userName: username },
    });

    return { message: "Username updated successfully", status: "green" };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { message: "Username already exists", status: "green" };
    } else {
      // Handle other errors
      console.error("Error updating username:", error);
      return { message: "An error occurred while updating the username" };
    }
  }
}
