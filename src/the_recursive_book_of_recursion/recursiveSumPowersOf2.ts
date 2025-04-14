
export const recursiveSumPowersOf2 = (value: number): number => {
    if (value === 0) {
        return 0;
    }

    return (2 ** value) + recursiveSumPowersOf2(value - 1);
}