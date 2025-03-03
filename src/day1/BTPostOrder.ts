const walk = (node: BinaryNode<number> | null, output: number[] = []): number[] => {
    if (node === null) {
        return [];
    }

    // pre 

    // recurse
    walk(node.left, output);
    walk(node.right, output);

    // post 
    output.push(node.value);

    return output;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head);
}