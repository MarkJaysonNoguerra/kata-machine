
export const sumByRecursion = (num: number): number => {
    if (num === 0) {
        return 0;
    }

    return num + sumByRecursion(num - 1);
}