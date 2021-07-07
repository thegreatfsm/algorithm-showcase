import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PathfindingState {
    grid: number[][];
} 

const generateGrid = () => {
    const rows = 20;
    const columns = 35;
    let grid = new Array<number[]>(rows);
    for(let i = 0; i < rows; i++) grid[i] = new Array<number>(columns).fill(0);
    grid[0][0] = -2;
    grid[7][7] = 2;
    return grid;
}

const initialState: PathfindingState = {
    grid: generateGrid(),
}

const copyGrid = (grid: number[][]) => {
    let newGrid = [];
    for(let row of grid){
        newGrid.push([...row]);
    }
    return newGrid;
}

export const pathfindingSlice = createSlice({
    name: 'pathfinding',
    initialState,
    reducers:{
        update: (state, action: PayloadAction<number[][]>) => {
            state.grid = copyGrid(action.payload);
        },
        updateCoordinates: (state, action: PayloadAction<number[]>) => {
            const coords = action.payload;
            let newRow = [...state.grid[coords[0]]];
            newRow[coords[1]] = coords[2];
            state.grid[coords[0]] = newRow;
        },
    },
});


export const { update, updateCoordinates } = pathfindingSlice.actions;

export default pathfindingSlice.reducer;