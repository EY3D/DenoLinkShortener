import { Router } from "./router.ts";

const app = new Router();

app.get("/", () => new Response("Hi Mommy!"));

app.post("/health-check", () => new Response("THE SERVER IS ALIVE!"));

export default {
  fetch(req:any) {
    return app.handler(req);
  }
} satisfies Deno.ServeDefaultExport;