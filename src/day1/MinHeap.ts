
export default class MinHeap {
    private data: number[];

    constructor() {
        this.data = new Array(1);
    }

    insert(value: number): void {
        this.data.push(value);
        this.heapifyUp(this.length);
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        if (this.length === 1) {
            return this.data.pop()!;
        }

        const val = this.data[1];
        this.data[1] = this.data.pop()!;
        this.heapifyDown(1);

        return val;
    }

    peak(): number | undefined {
        if (this.length === 0) {
            return undefined;
        }

        return this.data[1];
    }

    heapifyUp(index: number) {
        if (index < 1 || this.length === 1) {
            return;
        }

        const parent = this.parent(index);
        if (this.data[index] < this.data[parent]) {
            this.swap(index, parent);
            this.heapifyUp(parent);
        }
    }

    heapifyDown(index: number) {
        if (index >= this.length || this.length === 1) {
            return;
        }

        const left = this.leftChild(index);
        const right = this.rightChild(index);

        if (this.data[right] === undefined || this.data[left] < this.data[right]) {
            if (this.data[left] < this.data[index]) {
                this.swap(left, index);
                this.heapifyDown(left);
            }
        } else {
            if (this.data[right] < this.data[index]) {
                this.swap(right, index);
                this.heapifyDown(right);
            }
        }
    }

    parent(index: number): number {
        return Math.floor(index / 2)
    }

    leftChild(index: number): number {
        return index * 2;
    }

    rightChild(index: number): number {
        return index * 2 + 1;
    }

    swap(a: number, b: number): void {
        const temp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = temp;
    }

    get length() {
        return this.data.length - 1;
    }
}