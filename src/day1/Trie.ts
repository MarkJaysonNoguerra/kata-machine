
type TrieNode = {
    isWord: boolean;
    children: Record<string, TrieNode>;
}

const createTrieNode = () => {
    return {
        isWord: false,
        children: {}
    }
}

export default class Trie {

    private root: TrieNode;

    constructor() {
        this.root = createTrieNode();
    }

    insert(item: string): void {
        let currentNode = this.root;

        for (let i = 0; i < item.length; i++) {
            const char = item[i]
            if (!currentNode.children[char]) {
                currentNode.children[char] = createTrieNode();
            }

            currentNode = currentNode.children[char];
        }

        currentNode.isWord = true;
    }

    delete(item: string): void {
        this.deleteHelper(this.root, item, 0);
    }

    private deleteHelper(node: TrieNode, item: string, depth: number): boolean {
        if (depth === item.length) {
            if (!node.isWord) {
                return false
            }
            node.isWord = false
            return Object.keys(node.children).length === 0;
        }

        const char = item[depth];
        if (node.children[char]) {
            const shouldDeleteChild = this.deleteHelper(node.children[char], item, depth + 1);

            if (shouldDeleteChild) {
                delete node.children[char]
                return Object.keys(node.children).length === 0 && !node.isWord;
            }
        }

        return false;
    }

    find(partial: string): string[] {
        let currentNode = this.root;
        for (let i = 0; i < partial.length; i++) {
            const char = partial[i];

            if (!currentNode.children[char]) {
                return [];
            }

            currentNode = currentNode.children[char];
        }

        return this.getWords(currentNode, [partial]);
    }

    private getWords(node: TrieNode, res: string[] = []): string[] {
        const keys = Object.keys(node.children);
        if (keys.length === 0) {
            return res;
        }

        if (node.isWord) {
            const newWord = res[res.length - 1];
            res.push(newWord);
        }

        const lastWordIndex = res.length - 1;
        for (const key of keys) {
            res[lastWordIndex] = `${res[lastWordIndex]}${key}`;
            res = this.getWords(node.children[key], res);
        }

        return res;
    }
}