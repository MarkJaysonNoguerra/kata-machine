type Node<T> = {
    value: T;
    next?: Node<T>
}

export default class Stack<T> {
    public length: number;

    public head?: Node<T>

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;
        const node = this.head;
        this.head = node?.next;
        return node?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}