import { sum } from "@recursion/sum";

test("sum", () => {
    expect(sum([10, 20, 30, 40, 100])).toBe(200);

    expect(sum([1, 2, 3, 4, 5, 6, 9])).toBe(30);
});