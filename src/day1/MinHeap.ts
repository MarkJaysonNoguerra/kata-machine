export default class MinHeap {
    public length: number;

    public data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.length++;
        this.data.push(value);
        this.heapifyUp();
    }

    delete(): number {
        this.length--;
        const result = this.data.shift();
        this.heapifyDown();

        return result!;
    }


    private heapifyUp() {
        let currentIndex = this.length - 1;
        let parentIndex = Math.floor((currentIndex - 1) / 2);

        while (parentIndex >= 0) {
            if (this.data[parentIndex] > this.data[currentIndex]) {
                this.swap(parentIndex, currentIndex);
                currentIndex = parentIndex;
                parentIndex = Math.floor((currentIndex - 1) / 2);
                continue;
            }

            break;
        }
    }

    private heapifyDown() {
        let currentIndex = 0;
        let leftIndex = (currentIndex * 2) + 1;
        let rightIndex = (currentIndex * 2) + 2;

        while (currentIndex < this.length) {
            const leftValue = this.data[leftIndex];
            const rightValue = this.data[rightIndex];
            const currentValue = this.data[currentIndex];

            if (leftValue < rightValue) {
                if (currentValue > leftValue) {
                    this.swap(leftIndex, currentIndex);
                    currentIndex = leftIndex;
                    leftIndex = (currentIndex * 2) + 1;
                    rightIndex = (currentIndex * 2) + 2;
                    continue;
                }

                break;
            } else {
                if (currentValue > rightValue) {
                    this.swap(rightIndex, currentIndex);
                    currentIndex = rightIndex;
                    leftIndex = (currentIndex * 2) + 1;
                    rightIndex = (currentIndex * 2) + 2;
                    continue;
                }

                break;
            }

        }
    }

    private swap(a: number, b: number): void {
        const temp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = temp;
    }

}