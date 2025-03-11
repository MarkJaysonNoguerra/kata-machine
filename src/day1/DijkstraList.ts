
export default function dijkstra_list(source: number, needle: number, graph: WeightedAdjacencyList): number[] {

    const seen = Array.from({ length: graph.length }).fill(false) as boolean[];
    const previous = Array.from({ length: graph.length }).fill(-1) as number[];
    const weights = Array.from({ length: graph.length }).fill(Infinity) as number[];
    weights[source] = 0;

    while (hasUnvisitedNode(seen)) {
        const node = lowestUnvisited(weights, seen);
        seen[node] = true;

        const adjecency = graph[node];
        for (const item of adjecency) {
            const distance = weights[node] + item.weight;
            if (distance < weights[item.to]) {
                weights[item.to] = distance;
                previous[item.to] = node;
            }
        }
    }

    let curr = needle;
    const out: number[] = [curr];
    while (previous[curr] >= 0) {
        out.push(previous[curr]);
        curr = previous[curr];
    }

    return out.reverse();
}

const lowestUnvisited = (weights: number[], seen: boolean[]): number => {

    let lowestNode = Infinity;
    for (let i = 0; i < weights.length; i++) {
        if (!seen[i] && weights[i] < lowestNode) {
            lowestNode = i
        }
    }

    return lowestNode;
}

const hasUnvisitedNode = (seen: boolean[]) => {
    return seen.some(x => !x);
}