import { sumByRecursion } from "@recursion/sumByRecursion";

test("sumByRecursion", () => {
    expect(sumByRecursion(10)).toBe(55);

    expect(sumByRecursion(4)).toBe(10);
});