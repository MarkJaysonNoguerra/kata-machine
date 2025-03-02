
const qs = (arr: number[], low: number, high: number): void => {
    if (low >= high) {
        return;
    }

    const pivot = partition(arr, low, high);
    qs(arr, low, pivot - 1);
    qs(arr, pivot + 1, high);

}

const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let pivotIndex = low - 1;

    for (let i = low; i < high; i++) {
        if (arr[i] < pivot) {
            pivotIndex++;
            const temp = arr[pivotIndex];
            arr[pivotIndex] = arr[i];
            arr[i] = temp;
        }
    }

    pivotIndex++;
    arr[high] = arr[pivotIndex]
    arr[pivotIndex] = pivot;

    return pivotIndex;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}