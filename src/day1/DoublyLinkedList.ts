type Node<T> = {
    value: T;
    previous?: Node<T>
    next?: Node<T>
}

const createNode = <T>(value: T): Node<T> => {
    return {
        value
    }
}

export default class DoublyLinkedList<T> {
    public length: number;

    private head?: Node<T>;

    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node = createNode(item);
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.previous = node;
            this.head = node;
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;
        const node = this.getNodeByIndex(idx);
        const newNode = createNode(item);

        newNode.next = node;

        if (node?.previous) {
            node.previous.next = newNode;
            newNode.previous = node?.previous;
            node!.previous = newNode;
        }
    }

    append(item: T): void {
        if (!this.tail) {
            this.prepend(item);
            return;
        }

        this.length++;
        const node = createNode(item);
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {

        let node = this.head;
        while (node) {
            if (node.value === item) {
                this.length--;

                if (node === this.tail) {
                    this.tail = node.previous
                }

                if (node === this.head) {
                    this.head = node.next;
                }

                if (node.previous) {
                    node.previous.next = node.next;
                }

                if (node.next) {
                    node.next.previous = node.previous;
                }

                node.next = undefined;
                node.previous = undefined;
                return node.value;
            }

            node = node.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getNodeByIndex(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNodeByIndex(idx);
        if (node) {
            this.length--;
            if (node === this.tail) {
                this.tail = node.previous;
            }
            if (node === this.head) {
                this.head = node.next;
            }

            if (node.previous) {
                node.previous.next = node.next;
            }

            if (node.next) {
                node.next.previous = node.previous;
            }

            node.next = node.previous = undefined;
            return node.value;
        }

        return undefined;
    }

    private getNodeByIndex(idx: number): Node<T> | undefined {
        if (idx >= this.length || idx < 0) {
            return undefined;
        }

        let node = this.head;
        for (let i = 0; i < idx; i++) {
            node = node?.next;
        }
        return node;
    }
}