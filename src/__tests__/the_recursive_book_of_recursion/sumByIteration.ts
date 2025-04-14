import { sumByIteration } from "@recursion/sumByIteration";

test("sumByIteration", () => {
    expect(sumByIteration(10)).toBe(55);

    expect(sumByIteration(4)).toBe(10);
});