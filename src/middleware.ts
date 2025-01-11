import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    // if (pathname === '/' || token) {
        return NextResponse.next();
    // }

    // const loginUrl = new URL('/', req.url);
    // return NextResponse.redirect(loginUrl);
}

export const config = {
    // matcher: [
    //     '/(routes)/:path*'
    // ],
};
