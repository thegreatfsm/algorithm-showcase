import { dfs } from './dfs';

const availablePathfinders: {[key: string]:  (grid: number[][], r: number, c: number, updateCoordinates: (coords: number[]) => void) => Promise<boolean> } = {
    'DFS' : dfs,
};


export { availablePathfinders }; 