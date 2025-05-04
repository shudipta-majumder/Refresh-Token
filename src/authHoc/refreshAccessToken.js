"use client";

import { update } from "next-auth/react";

export const updateSession = async (session, newAccessToken) => {
  await update({
    ...session,
    user: {
      ...session?.user,
      accessToken: newAccessToken,
    },
  });
};

export const refreshAccessToken = async (refreshToken, session) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/refresh-access-token`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const responseData = await response.json();

    const newAccessToken = responseData.accessToken;

    await updateSession(session, newAccessToken);

    return { newAccessToken };
  } catch (error) {
    throw new Error(error);
  }
};
