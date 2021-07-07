const dirs = [[1,0],[0,1],[-1,0],[0,-1]];

export const dfs = async (grid: number[][], r: number, c: number, updateCoordinates: (coords: number[]) => void) => {
    return await internalDfs(grid, true, r, c, updateCoordinates);
}

const internalDfs = async (grid: number[][], start: boolean,  r: number, c: number, updateCoordinates: (coords: number[]) => void): Promise<boolean> => {
    if(grid[r][c] === 2) return true;
    if((grid[r][c] === -2 && !start) || grid[r][c] === -1 || grid[r][c] === 1) return false;
    if(!start){
        await updateCoordinates([r,c,1]);
        grid[r][c] = 1;
    }
    let res = false;
    for(let dir of dirs){
        const nr = r + dir[0];
        const nc = c + dir[1];
        if(nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length){
            res = res || await internalDfs(grid, false, nr, nc, updateCoordinates);
            if(res) return res;
        }
    }
    return Promise.resolve(res);
}