
export const sumByIteration = (num: number): number => {
    let result = 0;
    for (let i = 1; i <= num; i++) {
        result += i;
    }

    return result;
}