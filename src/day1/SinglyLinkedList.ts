type Node<T> = {
    value: T;
    next?: Node<T>
}

export default class SinglyLinkedList<T> {
    public length: number;

    private head?: Node<T>;

    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        this.length++;

        const node = { value: item } as Node<T>
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length - 1) {
            return; // out off bound.
        }

        this.length++;
        if (idx === 0) {
            this.prepend(item);
            return;
        }

        const newNode = { value: item } as Node<T>;
        const previousNode = this.getNodeByIndex(idx - 1)!;
        const node = this.getNodeByIndex(idx)!;

        previousNode.next = newNode
        newNode.next = node;
    }

    append(item: T): void {
        if (!this.head || !this.tail) {
            this.prepend(item);
            return;
        }

        this.length++;
        const node = { value: item } as Node<T>;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let currentNode = this.head;
        if (!currentNode) {
            return undefined;
        }

        if (currentNode?.value === item) {
            this.length--;
            this.head = this.head?.next;

            currentNode.next = undefined;
            return currentNode.value;
        }


        while (currentNode) {
            const nextNode = currentNode?.next as Node<T> | undefined;
            if (nextNode?.value === item) {
                this.length--;
                if (nextNode === this.tail) {
                    this.tail = currentNode;
                    currentNode.next = undefined;
                    return nextNode.value;
                }

                currentNode.next = nextNode.next;
                nextNode.next = undefined;
                return nextNode.value;
            }
            currentNode = nextNode;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getNodeByIndex(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        let index = 0;
        let currentNode = this.head
        if (!this.head || idx > this.length - 1) {
            return undefined;
        }

        this.length--;
        if (idx === 0) {
            if (this.length === 0) {
                this.head = this.tail = undefined;
            } else {
                this.head = currentNode!.next;
                currentNode!.next = undefined;
            }
            return currentNode?.value;
        }

        while (currentNode) {
            const next = currentNode.next;
            index++;
            if (index === idx) {
                currentNode.next = next?.next;

                if (next?.next) {
                    next.next = undefined;
                }
                return next?.value;
            }
            currentNode = currentNode.next;
        }

        return undefined;
    }

    private getNodeByIndex(idx: number): Node<T> | undefined {
        let index = 0;
        let currentItem = this.head;
        while (currentItem && index != idx) {
            currentItem = currentItem.next;
            index++;
        }

        return currentItem;
    }
}