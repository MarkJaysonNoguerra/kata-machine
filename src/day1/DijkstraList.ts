
const getLowestUnvisited = (seen: boolean[], distances: number[]): number => {
    let idx = -1;
    let lowestWeight = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (!seen[i] && distances[i] < lowestWeight) {
            idx = i;
            lowestWeight = distances[i];
        }
    }

    return idx;
}

export default function dijkstra_list(source: number, needle: number, graph: WeightedAdjacencyList): number[] {

    const previous = Array.from({ length: graph.length }).fill(-1) as number[];
    const seen = Array.from({ length: graph.length }).fill(false) as boolean[];
    const distances = Array.from({ length: graph.length }).fill(Infinity) as number[];
    distances[source] = 0;

    while (seen.some(x => !x)) {
        const node = getLowestUnvisited(seen, distances);
        seen[node] = true;

        const adjecency = graph[node];
        for (const item of adjecency) {
            if (seen[item.to]) {
                continue;
            }

            const distance = distances[node] + item.weight;
            if (distance < distances[item.to]) {
                previous[item.to] = node;
                distances[item.to] = distance;
            }
        }
    }


    let curr = previous[needle];
    let output = [needle];
    while (curr !== -1) {
        output.push(curr);
        curr = previous[curr];
    }

    output = output.reverse();
    return output[0] === source ? output : [];
}
