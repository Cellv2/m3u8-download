import { validateResponseHasM3u8ContentType } from "../../validator";

describe("[integration] validateIsM3u8ContentType", () => {
    it("should check the content type is valid", async () => {
        const response = await fetch("http://localhost:3000/m3u8");

        const hasCorrectContentType =
            validateResponseHasM3u8ContentType(response);

        expect(hasCorrectContentType).toBe(true);
    });
});
