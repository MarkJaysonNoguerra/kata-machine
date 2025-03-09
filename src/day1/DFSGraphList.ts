
const walk = (
    graph: WeightedAdjacencyList,
    source: number,
    neddle: number,
    seen: boolean[],
    path: number[]
): boolean => {
    if (seen[source]) {
        return false;
    }

    path.push(source);
    if (source === neddle) {
        return true;
    }


    seen[source] = true;
    const list = graph[source];
    for (const item of list) {
        if (walk(graph, item.to, neddle, seen, path)) {
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
    return path.length === 0 ? null : path;
}