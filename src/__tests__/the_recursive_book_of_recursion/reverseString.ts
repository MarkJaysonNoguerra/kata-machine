import { reverseString } from "@recursion/reverseString";

test("reverseString", () => {
    expect(reverseString("hello world")).toBe("dlrow olleh");

    expect(reverseString("breadfirstSearch")).toBe("hcraeStsrifdaerb");
});