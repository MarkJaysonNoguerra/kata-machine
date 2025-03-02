const dirs: Point[] = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
]

const walk = (maze: string[], wall: string, currentPoint: Point, end: Point, seen: boolean[][], path: Point[]): boolean => {
    // base cases
    // off the board
    const { x, y } = currentPoint;
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) {
        return false;
    }

    // on the wall
    if (maze[y][x] === wall) {
        return false;
    }


    // end
    if (x === end.x && y === end.y) {
        path.push(currentPoint);
        return true;
    }

    // already seen
    if (seen[y][x]) {
        return false;
    }


    // pre 
    seen[y][x] = true;
    path.push(currentPoint);

    // recurse 
    for (const direction of dirs) {
        if (walk(maze, wall, {
            x: x + direction.x,
            y: y + direction.y
        }, end, seen, path)) {
            return true;
        }
    }

    // post 
    path.pop();

    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const path: Point[] = []
    const seen: boolean[][] = []

    for (let i = 0; i < maze[0].length; i++) {
        seen.push(Array.from({ length: maze[0].length }).fill(false) as boolean[]);
    }

    walk(maze, wall, start, end, seen, path);
    return path;
}