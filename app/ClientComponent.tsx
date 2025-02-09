"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import Login from "./login/page";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";

export default function ClientComponent({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");

        if (token) {
            setAuth(true);
        } else {
            setAuth(false);

            if (pathname !== '/login') router.push('/login');
        }
    }, [router, pathname]);

    if (!auth) {
        if (pathname === '/login') {
            return <Login />;
        }

        return null;
    }

    return (
        <>
            <ResponsiveNav />
            {children}
        </>
    );
}