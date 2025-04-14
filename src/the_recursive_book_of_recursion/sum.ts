
export const sum = (value: number[]): number => {
    if (value.length === 0) {
        return 0;
    }

    if (value.length === 1) {
        return value[0];
    }

    const head = value[0];
    const tail = value.slice(1);
    return head + sum(tail);
}