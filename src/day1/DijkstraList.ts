const hasUnvisitedNode = (seen: boolean[]): boolean => {
    return seen.some(x => !x);
}

const getLowestUnVisitedNode = (seen: boolean[], distances: number[]): number => {
    let minWeight = Infinity;
    let index = -1;

    for (let i = 0; i < distances.length; i++) {
        if (!seen[i] && distances[i] < minWeight) {
            minWeight = distances[i];
            index = i;
        }
    }

    return index;
}


export default function dijkstra_list(source: number, needle: number, graph: WeightedAdjacencyList): number[] {

    const seen = Array.from({ length: graph.length }).fill(false) as boolean[];
    const previous = Array.from({ length: graph.length }).fill(-1) as number[];
    const distances = Array.from({ length: graph.length }).fill(Infinity) as number[];
    distances[source] = 0;

    while (hasUnvisitedNode(seen)) {
        const node = getLowestUnVisitedNode(seen, distances);
        seen[node] = true;

        const adjacency = graph[node];
        for (const nextNode of adjacency) {
            const weight = distances[node] + nextNode.weight;

            if (!seen[nextNode.to] && weight < distances[nextNode.to]) {
                previous[nextNode.to] = node;
                distances[nextNode.to] = weight;
            }
        }
    }

    let out: number[] = [needle];
    let current = needle;

    while (previous[current] !== -1) {
        out.push(previous[current]);
        current = previous[current];
    }
    out = out.reverse()

    return out[0] === source ? out : [];
}
