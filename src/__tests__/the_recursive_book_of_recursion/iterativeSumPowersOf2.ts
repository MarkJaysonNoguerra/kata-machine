import { iterativeSumPowersOf2 } from "@recursion/iterativeSumPowersOf2";

test("iterativeSumPowersOf2", () => {
    expect(iterativeSumPowersOf2(3)).toBe(14);

    expect(iterativeSumPowersOf2(5)).toBe(62);
});