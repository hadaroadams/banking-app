"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    // mutation / Database / Make fetch
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, firstName, lastName, password } = userData;
  try {
    // mutation / Database / Make fetch
    const { account } = await createAdminClient();
    // console.log(4, account);

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    // console.log(5, newUserAccount);
    const session = await account.createEmailPasswordSession(email, password);

    // console.log(6, session);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    (await cookies()).delete("appwrite-sesssion");
    await account.deleteSession("current");
  } catch (errro) {
    return null;
  }
};
