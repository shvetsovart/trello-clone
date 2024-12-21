import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/organization(.*)",
  "/board(.*)",
  "/select-org",
  "/api/cards(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!(await auth()).userId && isProtectedRoute(req)) {
    return (await auth()).redirectToSignIn({ returnBackUrl: req.url });
  }

  if ((await auth()).userId && !isProtectedRoute(req)) {
    let path: string = "/select-org";

    if ((await auth()).orgId) {
      path = `/organization/${(await auth()).orgId}`;
    }
    return NextResponse.redirect(new URL(path, req.url));
  }

  if (
    (await auth()).userId &&
    !(await auth()).orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
