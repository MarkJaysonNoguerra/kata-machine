import { isPalindrome } from "@recursion/isPalindrome";

test("isPalindrome", () => {
    expect(isPalindrome("helloworld")).toBe(false);

    expect(isPalindrome("level")).toBe(true);

    expect(isPalindrome("pop")).toBe(true);
});