import { Route, route, serveDir } from "@std/http";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: () => new Response("Home page"),
  },
  {
    pattern: new URLPattern({ pathname: "/users/:id" }),
    handler: (_req, _info, params) => new Response(params?.pathname.groups.id),
  },
  {
    pattern: new URLPattern({ pathname: "/static/*" }),
    handler: (req) => serveDir(req),
  },
];

// return 404 if no route found
function defaultHandler(_req: Request) {
  return new Response("Not found, please check URL", {status: 404});
}

const handler = route(routes, defaultHandler);

export default {
  fetch(req:any) {
    //console.log("Hey the typeof req is:", typeof req)
    let x = handler(req);
    console.log(x, "\nis ", typeof x);
    return x;
    //the above handler will return Response type
  },
} satisfies Deno.ServeDefaultExport;