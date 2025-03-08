export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {

    const seen = Array.from({ length: graph.length }).fill(false) as boolean[];
    const previousPaths = Array.from({ length: graph.length }).fill(-1) as number[];
    const queue = [source];

    while (queue.length) {
        const node = queue.shift()!;
        seen[node] = true;

        const adjacency = graph[node];
        for (let i = 0; i < adjacency.length; i++) {
            if (adjacency[i] === 0 || seen[i]) {
                continue;
            }

            previousPaths[i] = node;
            if (needle === i) {
                break;
            }

            queue.push(i);
        }
    }

    if (previousPaths[needle] === -1) {
        return null;
    }

    let curretNode = previousPaths[needle];
    const path = [needle];

    while (curretNode >= 0) {
        path.push(curretNode);
        curretNode = previousPaths[curretNode];
    }

    return path.reverse();
}