import { dfs } from './dfs';
import { bfs } from './bfs';

const availablePathfinders: {[key: string]:  (grid: number[][], r: number, c: number, updateCoordinates: (coords: number[]) => void) => Promise<boolean> } = {
    'DFS' : dfs,
    'BFS' : bfs,
};


export { availablePathfinders }; 