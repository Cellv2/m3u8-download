import { http, HttpResponse, passthrough } from "msw";

export const handlers = [
    // Intercept "GET https://example.com/user" requests...
    http.get("https://example.com/user", () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json({
            id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
            firstName: "John",
            lastName: "Maverick",
        });
    }),

    http.get("http://localhost:3000/m3u8-chained", () => passthrough()),
    http.get("http://localhost:3000/m3u8", () => passthrough()),

    http.get("http://this-errors/", () => HttpResponse.error()),
    http.get(
        "http://error500/",
        () =>
            new HttpResponse("ded", {
                status: 500,
                statusText: "500 Internal Server Error",
            })
    ),
];
