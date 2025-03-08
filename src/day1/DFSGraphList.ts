
const walk = (
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
    seen: boolean[],
    path: number[]
): boolean => {
    if (source === needle) {
        path.push(source);
        return true;
    }

    if (seen[source]) {
        return false;
    }

    seen[source] = true;
    path.push(source);

    for (const item of graph[source]) {
        if (walk(graph, item.to, needle, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen = Array.from({ length: graph.length }).fill(false) as boolean[];
    const path: number[] = [];

    walk(graph, source, needle, seen, path);
    return path.length > 0 ? path : null;
}