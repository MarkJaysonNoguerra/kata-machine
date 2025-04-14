import { recursiveSumPowersOf2 } from "@recursion/recursiveSumPowersOf2";

test("recursiveSumPowersOf2", () => {
    expect(recursiveSumPowersOf2(3)).toBe(14);

    expect(recursiveSumPowersOf2(5)).toBe(62);
});