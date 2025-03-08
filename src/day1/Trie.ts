type TrieNode = {
    isWord: boolean;
    children: Record<string, TrieNode>
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
            const char = item[i];
            if (!currentNode.children[char]) {
                currentNode.children[char] = createTrieNode();
            }

            currentNode = currentNode.children[char];
        }

        currentNode.isWord = true;
    }

    delete(item: string): void {
        const paths: Array<{ char: string, node: TrieNode }> = [];
        let currentNode = this.root;

        for (let i = 0; i < item.length; i++) {
            const char = item[i];
            if (!currentNode.children[char]) {
                break;
            }

            currentNode = currentNode.children[char];
            paths.push({ char: char, node: currentNode });
        }

        if (currentNode.isWord) {
            currentNode.isWord = false;
            // do node deletion 
            while (paths.length) {
                const { char, node } = paths.pop()!;

                if (node.isWord || Object.keys(node.children).length > 0) {
                    break;
                }

                const parent = paths[paths.length - 1]?.node;
                if (parent) {
                    delete parent.children[char];
                }
            }
        }
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

        const results: string[] = [];
        const queue: Array<{ word: string, node: TrieNode }> = [{ word: partial, node: currentNode }];

        while (queue.length) {
            const { node, word } = queue.shift()!;

            if (node.isWord) {
                results.push(word);
            }

            for (const key of Object.keys(node.children)) {
                queue.push({ word: `${word}${key}`, node: node.children[key] });
            }
        }

        return results;
    }
}