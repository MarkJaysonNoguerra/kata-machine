const walk = (node: BinaryNode<number> | null, output: number[] = []): number[] => {
    if (node === null) {
        return [];
    }

    // pre 

    // recurse
    walk(node.left, output);
    output.push(node.value);
    walk(node.right, output);

    // post 

    return output;
}


export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head);
}