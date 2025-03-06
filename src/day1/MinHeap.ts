
export default class MinHeap {
    public length: number;

    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.length++;
        this.data.push(value);
        this.heapifyUp(this.length - 1);
    }

    delete(): number {
        if (this.length == 0) {
            return -1;
        }

        this.length--;
        const result = this.data[0]!;
        this.data[0] = this.data.pop()!;
        this.heapifyDown(0);

        return result;
    }

    heapifyUp(index: number) {
        if (index <= 0) {
            return;
        }

        const parentIndex = this.parent(index);
        const value = this.data[index];
        const parentValue = this.data[parentIndex];

        if (value < parentValue) {
            this.swap(index, parentIndex);
            this.heapifyUp(parentIndex);
        }
    }

    heapifyDown(index: number) {
        if (index > this.length) {
            return;
        }

        const leftIndex = this.leftChild(index);
        const rightIndex = this.rightChild(index);

        const leftValue = this.data[leftIndex];
        const rightValue = this.data[rightIndex];
        const value = this.data[index];

        if (leftValue < rightValue && value > leftValue) {
            this.swap(leftIndex, index);
            this.heapifyDown(leftIndex);
        }

        if (leftValue > rightValue && value > rightValue) {
            this.swap(rightIndex, index);
            this.heapifyDown(rightIndex);
        }
    }

    private leftChild(index: number): number {
        return (index * 2) + 1;
    }

    private rightChild(index: number): number {
        return (index * 2) + 2;
    }

    private parent(index: number) {
        return Math.floor((index - 1) / 2);
    }

    private swap(a: number, b: number) {
        const temp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = temp;
    }
}