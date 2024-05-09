import {NextRequest, NextResponse} from "next/server";
import {EnumTokens} from "./services/auth-token.service";
import {DASHBOARD_PAGES} from "./config/pages-url.config";
//import {URL} from "url";

export async function middleware(
    request:NextRequest,
    response:NextResponse
) {
    const {url, cookies} = request

    const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

    //const isDashboardPage = url.includes('/i')
    const isAuthPAge = url.includes('/auth')

    //if user already logged doesn't show login page - redirect to dashboard page
    if (isAuthPAge && refreshToken) {
        return NextResponse.redirect(new URL(DASHBOARD_PAGES.HONE, url))
    }

    //redirect to current user page
    if (isAuthPAge) {
        return NextResponse.next()
    }

    //redirect to 404 page for prevent access to dashboard, the alleged perpetrator will not know about this page
    if (!refreshToken) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    //show info after each page reloaded. get access from server
   // console.log(url, cookies)

    return NextResponse.next()
}

//condition trigger middleware
export const config = {
    //login page
    //any page in personal dashboard
    matcher: ['/i/:path*', '/auth/:path']
}
