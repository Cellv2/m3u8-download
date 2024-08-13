import { sum } from "./sum";
// jest.mock("./sum");

const mocked = jest.mocked(sum);

describe("sum function", () => {
    test("returns 3 when 1 and 2 is summed", () => {
        expect(sum(1, 2)).toBe(3);
    });
});
