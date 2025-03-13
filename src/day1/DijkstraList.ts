const hasUnvisited = (seen: boolean[]): boolean => {
    return seen.some(x => !x);
}

const lowestDistanceUnvisited = (distances: number[], seen: boolean[]): number => {
    let index = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < distances.length; i++) {
        if (!seen[i] && distances[i] < lowestDistance) {
            index = i;
            lowestDistance = distances[i];
        }
    }

    return index;
}

export default function dijkstra_list(source: number, needle: number, graph: WeightedAdjacencyList): number[] {

    // seen
    const seen = Array.from({ length: graph.length }).fill(false) as boolean[];
    const previous = Array.from({ length: graph.length }).fill(-1) as number[];
    const distances = Array.from({ length: graph.length }).fill(Infinity) as number[];
    distances[source] = 0;

    while (hasUnvisited(seen)) {
        const node = lowestDistanceUnvisited(distances, seen);
        seen[node] = true;

        const adjecency = graph[node];
        for (let i = 0; i < adjecency.length; i++) {
            const nextNode = adjecency[i];
            const weight = nextNode.weight + distances[node];

            if (seen[nextNode.to]) {
                continue;
            }

            if (weight < distances[nextNode.to]) {
                previous[nextNode.to] = node;
                distances[nextNode.to] = weight;
            }
        }
    }

    let current = needle;
    let output: number[] = [current]
    while (previous[current] >= 0) {
        current = previous[current];
        output.push(current);
    }
    output = output.reverse();

    return output[0] === source ? output : [];
}
