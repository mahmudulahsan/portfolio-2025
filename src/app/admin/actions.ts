"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string) {
    // Simple environment variable check
    // In a real app, you might use a more complex auth system
    const correctPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === correctPassword) {
        // Set a cookie to remember the session
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 // 1 day
        });
        return { success: true };
    }

    return { success: false, error: "Incorrect password" };
}

export async function checkSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return session?.value === "true";
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
}
