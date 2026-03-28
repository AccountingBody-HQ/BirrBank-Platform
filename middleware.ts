import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/countries(.*)",
  "/eor(.*)",
  "/hr-compliance(.*)",
  "/payroll-tools(.*)",
  "/compare(.*)",
  "/insights(.*)",
  "/search(.*)",
  "/pricing(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/disclaimer(.*)",
  "/privacy-policy(.*)",
  "/terms(.*)",
  "/cookie-policy(.*)",
  "/unsubscribe(.*)",
  "/ai-assistant(.*)",
  "/api/chat(.*)",
  "/api/subscribe(.*)",
  "/api/search(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};