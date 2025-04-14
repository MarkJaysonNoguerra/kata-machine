
export const iterativeSumPowersOf2 = (value: number): number => {
    let result = 0;
    for (let i = 1; i <= value; i++) {
        result += 2 ** i;
    }

    return result;
}