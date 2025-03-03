
const walk = (node: BinaryNode<number> | null, output: number[] = []): number[] => {
    if (node === null) {
        return [];
    }

    // pre 
    output.push(node.value);

    // recurse
    walk(node.left, output);
    walk(node.right, output);

    // post 

    return output;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head);
}