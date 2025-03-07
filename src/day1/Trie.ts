type TrieNode = {
    isWord: boolean;
    children: Record<string, TrieNode>;
}

const createTriNode = () => {
    return {
        isWord: false,
        children: {}
    }
}

export default class Trie {

    private root: TrieNode;

    constructor() {
        this.root = createTriNode();
    }

    insert(item: string): void {
        this.insertHelper(this.root, item);
    }

    private insertHelper(node: TrieNode, item: string, depth = 0): void {
        if (item.length === depth) {
            node.isWord = true;
            return;
        }

        const char = item[depth];
        if (!node.children[char]) {
            node.children[char] = createTriNode();
        }

        this.insertHelper(node.children[char], item, depth + 1);
    }

    delete(item: string): void {
        this.deleteHelper(this.root, item);
    }

    private deleteHelper(node: TrieNode, item: string, depth = 0): boolean {
        if (depth === item.length) {
            if (node.isWord) {
                node.isWord = false;
                return Object.keys(node.children).length === 0;
            }
            return false;
        }

        const char = item[depth];
        if (!node.children[char]) {
            return false;
        }

        const shouldDeleteNode = this.deleteHelper(node.children[char], item, depth + 1);

        if (shouldDeleteNode) {
            delete node.children[char];
            return Object.keys(node.children).length === 0 && !node.isWord;
        }

        return false;
    }

    find(partial: string): string[] {
        const node = this.findEndNode(this.root, partial);

        if (node) {
            const words = this.findWords(node, [partial]);
            words.pop();
            return words;
        }
        return [];
    }

    private findWords(node: TrieNode, words: string[]): string[] {
        if (node.isWord) {
            words.push(words[words.length - 1])
        }


        for (const key of Object.keys(node.children)) {
            const lastIndex = words.length - 1;
            words[lastIndex] = `${words[lastIndex]}${key}`;
            words = this.findWords(node.children[key], words);
        }

        return words;
    }

    private findEndNode(node: TrieNode, partial: string, depth = 0): TrieNode | undefined {
        if (depth === partial.length) {
            return node;
        }

        const char = partial[depth];
        if (node.children[char]) {
            return this.findEndNode(node.children[char], partial, depth + 1);
        }

        return undefined;
    }

}