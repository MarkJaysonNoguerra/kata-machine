

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {

    const seen = Array.from({ length: graph.length }).fill(false) as boolean[];
    const queue: Array<{ path: number[], node: number }> = [{ path: [source], node: source }];

    while (queue.length) {
        const { path, node } = queue.shift()!;
        seen[node] = true;

        const adjecency = graph[node];
        for (let i = 0; i < adjecency.length; i++) {
            if (adjecency[i] === 0 || seen[i]) {
                continue;
            }

            if (i === needle) {
                return path.concat(i);
            }

            queue.push({ path: path.concat(i), node: i });
        }
    }

    return null;
}