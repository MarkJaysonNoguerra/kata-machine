

export const isPalindrome = (value: string): boolean => {
    const length = value.length;
    if (length === 0 || length === 1) {
        return true;
    }

    const first = value[0];
    const last = value[length - 1];

    return first === last && isPalindrome(value.substring(1, length - 1))
}