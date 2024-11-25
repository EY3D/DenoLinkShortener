import { encodeBase64Url, encodeHex } from "jsr:@std/encoding";
import { crypto } from "jsr:@std/crypto/crypto";

export async function generateShortCode(longUrl:string) {
    try {
        new URL(longUrl);
    } catch (error) {
        console.log(error);
        throw new Error("Invalid URL provided, please check!");
    }

    // Generate a unique id for url
    const urlData = new TextEncoder().encode(longUrl + Date.now());
    console.log("urlData: ", urlData);
    const hash = await crypto.subtle.digest("SHA-256", urlData);
    console.log("hash: ", hash);
    const hashArray = new Uint8Array(hash);
    console.log("hashArray: ", hashArray);
    const hashHex = encodeHex(hashArray);
    console.log("hashHex: ", hashHex);

    // Trim to 8chars, using encodeBase64Url method which ensures it is safe for filenames and urls
    const shortCode = encodeBase64Url(hashHex.slice(0, 8));
    console.log("shortCode: ", shortCode);
    return shortCode;
}