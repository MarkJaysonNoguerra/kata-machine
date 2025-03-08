

export default function bfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen = Array.from({ length: graph.length }).fill(false) as boolean[];
    const queue: Array<{ path: number[], node: number }> = [{ path: [source], node: source }];

    while (queue.length) {
        const { path, node } = queue.shift()!;
        seen[node] = true;

        const list = graph[node];
        for (const item of list) {
            if (seen[item.to]) {
                continue;
            }

            if (item.to === needle) {
                return path.concat(needle);
            }

            queue.push({ path: path.concat(item.to), node: item.to });
        }
    }

    return null;
}