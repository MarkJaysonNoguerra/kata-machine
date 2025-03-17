type Node<T> = {
    value: T;
    previous?: Node<T>;
    next?: Node<T>
}

const createNode = <T>(value: T): Node<T> => {
    return {
        value
    }
}

export default class LRU<K, V> {

    private lookUp: Map<K, Node<V>>;

    private reverseLookUp: Map<Node<V>, K>;

    private head?: Node<V>;

    private tail?: Node<V>;

    private length: number;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookUp = new Map();
        this.reverseLookUp = new Map();
    }

    update(key: K, value: V): void {

        if (this.lookUp.has(key)) {
            const node = this.lookUp.get(key)!;
            this.detachNode(node);
            this.prependNode(node);
            node.value = value;
            return;
        }

        this.length++;
        const node = createNode(value);
        this.lookUp.set(key, node);
        this.reverseLookUp.set(node, key);
        this.prependNode(node);
        this.trimNode();
    }


    get(key: K): V | undefined {
        const node = this.lookUp.get(key);
        if (node) {
            this.detachNode(node);
            this.prependNode(node);
            return node.value;
        }

        return undefined;
    }

    private detachNode(node: Node<V>): void {
        if (node.previous) {
            node.previous.next = node.next;
        }

        if (node.next) {
            node.next.previous = node.previous
        }

        if (this.tail === node) {
            this.tail = node.previous
        }

        if (this.head === node) {
            this.head = node.next;
        }

        node.next = undefined;
        node.previous = undefined;
    }

    private prependNode(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
        }

        node.next = this.head;
        this.head.previous = node;
        this.head = node;
    }

    private trimNode(): void {
        if (this.length > this.capacity) {
            this.length--;
            const node = this.tail!;
            const key = this.reverseLookUp.get(node)!;
            this.lookUp.delete(key);
            this.reverseLookUp.delete(node);
            this.detachNode(this.tail!);
        }

    }
}