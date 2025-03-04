const walk = (current: BinaryNode<number>, needle: number): boolean => {
    const queue = [current];

    while (queue.length) {
        const node = queue.shift()!;
        if (node.value === needle) {
            return true;
        }

        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }

    return false;
}

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    return walk(head, needle);
}