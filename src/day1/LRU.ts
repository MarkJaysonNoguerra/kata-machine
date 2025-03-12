type Node<T> = {
    value: T;
    next?: Node<T>
    previous?: Node<T>
}

const createNode = <T>(value: T): Node<T> => {
    return { value };
}

export default class LRU<K, V> {
    private length: number;

    private head?: Node<V>;

    private tail?: Node<V>;

    private lookUp: Map<K, Node<V>>;

    private reverseLookUp: Map<Node<V>, K>;

    constructor(private capacity = 5) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.reverseLookUp = new Map();
        this.lookUp = new Map();
    }

    update(key: K, value: V): void {
        if (this.lookUp.has(key)) {
            const node = this.lookUp.get(key)!;
            this.detachNode(node);
            this.prependNode(node);
            node.value = value;
        } else {
            this.length++;
            const node = createNode(value);
            this.lookUp.set(key, node);
            this.reverseLookUp.set(node, key);
            this.prependNode(node);
            this.trimNode();
        }

    }


    get(key: K): V | undefined {
        if (!this.lookUp.has(key)) {
            return undefined;
        }
        const node = this.lookUp.get(key)!;

        this.detachNode(node);
        this.prependNode(node);

        return node?.value;
    }

    private detachNode(node: Node<V>): void {
        if (node.previous) {
            node.previous.next = node.next;
        }

        if (node.next) {
            node.next.previous = node.previous;
        }

        if (node === this.tail) {
            this.tail = node.previous;
        }

        if (node === this.head) {
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

    private trimNode() {
        if (this.length > this.capacity) {
            this.length--;

            const node = this.tail!;
            this.tail = node.previous;
            const key = this.reverseLookUp.get(node)!;

            this.detachNode(node);
            this.lookUp.delete(key);
            this.reverseLookUp.delete(node);

        }
    }

}