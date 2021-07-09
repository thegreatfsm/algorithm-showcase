const dirs = [[1,0],[0,1],[-1,0],[0,-1]];

export const bfs = async (grid: number[][], r: number, c: number, updateCoordinates: (coords: number[]) => void) => {
    return await internalBfs(grid, r, c, updateCoordinates);
}

const internalBfs = async (grid: number[][], r: number, c: number, updateCoordinates: (coords: number[]) => void): Promise<boolean> => {
    let q: number[][] = [[r,c]];
    while(q.length > 0){
        const [cr, cc] = q.shift() as number[];
        for(let dir of dirs){
            const nr = cr + dir[0];
            const nc = cc + dir[1];
            if(nr >= 0 && nr < grid.length && nc >=0 && nc < grid[0].length){
                if(grid[nr][nc] === 2) return Promise.resolve(true);
                if(grid[nr][nc] === 0){
                    q.push([nr, nc]);
                    grid[nr][nc] = 1;   
                    await updateCoordinates([nr, nc, 1]);
                } 
            }
        }
    }
    return Promise.resolve(false);
}