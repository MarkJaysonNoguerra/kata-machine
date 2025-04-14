
export const reverseString = (value: string): string => {
    if (value.length === 0 || value.length === 1) {
        return value;
    }

    const head = value[0];
    const tail = value.substring(1);

    return reverseString(tail) + head;
}