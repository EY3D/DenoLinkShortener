import { assertEquals, assertNotEquals, assertRejects } from "@std/assert";
import server from "./main.ts";
import { delay } from "jsr:@std/async/delay";
import { generateShortCode } from "./db/db.ts";

Deno.test("URL Shortener", async (t) => {
  await t.step("should generate a short code for a valid URL", async () => {
    const longUrl = "https://www.google.com";
    const shortCode = await generateShortCode(longUrl);

    assertEquals(typeof shortCode, "string");
    assertEquals(shortCode.length, 11);
  });

  await t.step("should be unique for each timestamp", async () => {
    const longUrl = "https://www.example.com";
    const a = await generateShortCode(longUrl);
    await delay(5);
    const b = await generateShortCode(longUrl);
    assertNotEquals(a, b);
  });

  await t.step("throw e on bad Url", () => {
    const longUrl = "this aint a url";
    assertRejects(async () => {
      await generateShortCode(longUrl);
    });
  });
});
