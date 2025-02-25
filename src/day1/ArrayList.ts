export default class ArrayList<T> {

    public length: number;
    private capacity: number;
    private array: Array<T | undefined>

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;
        this.array = [];
    }

    prepend(item: T): void {
        this.length++;
        if (this.length > this.capacity) {
            this.doubleCapacity();
        }
        this.array = [item, ...this.array];
    }

    append(item: T): void {
        this.length++;
        if (this.length > this.capacity) {
            this.doubleCapacity();
        }
        this.array[this.length - 1] = item;
    }

    insertAt(item: T, idx: number): void {
        this.array[idx] = item;
    }

    remove(item: T): T | undefined {
        let itemIndex = -1;
        this.array.map((value, index) => {
            if (value === item) {
                this.length--;
                itemIndex = index;
            }
        })

        if (itemIndex === -1) {
            return undefined
        }
        this.array = [...this.array.slice(0, itemIndex), ...this.array.slice(itemIndex + 1)]

        return item;
    }

    get(idx: number): T | undefined {
        return this.array[idx];
    }

    removeAt(idx: number): T | undefined {
        this.length--;
        const value = this.array[idx];
        this.array = [...this.array.slice(0, idx), ...this.array.slice(idx + 1)];

        return value;
    }

    private doubleCapacity() {
        this.capacity *= 2;
        const doubledArray = Array.from({ length: this.capacity }).fill(undefined);

        this.array = doubledArray.map((_, index) => this.array[index]);
    }
}