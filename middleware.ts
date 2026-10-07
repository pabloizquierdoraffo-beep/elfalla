import { NextResponse, type NextRequest } from "next/server";
import { VISITOR_COOKIE } from "./lib/visitor-cookie";

// Da a cada móvil un identificador anónimo la primera vez que entra.
// Se añade también a la petición en curso para que la página ya lo vea.
export function middleware(request: NextRequest) {
  if (request.cookies.has(VISITOR_COOKIE)) return NextResponse.next();

  const id = crypto.randomUUID();
  const headers = new Headers(request.headers);
  const current = request.headers.get("cookie");
  headers.set("cookie", current ? `${current}; ${VISITOR_COOKIE}=${id}` : `${VISITOR_COOKIE}=${id}`);

  const response = NextResponse.next({ request: { headers } });
  response.cookies.set(VISITOR_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 400,
    path: "/",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/|marca/|fotos/|tarjeta/|icon|apple-icon|favicon).*)"],
};
