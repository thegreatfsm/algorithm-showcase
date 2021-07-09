import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrushTypes } from '../../helper/pathfindingHelpers/pathfindingBrushes/brushFactory';


interface PathfindingState {
    grid: number[][];
    startCoordinates: [number, number];
    goalCoordinates: [number, number];
    activeBrush: string;
    availableBrushes: BrushTypes[];
} 

const generateGrid = (startCoordinates: [number, number], goalCoordinates:[number, number]) => {
    const rows = 20;
    const columns = 35;
    let grid = new Array<number[]>(rows);
    for(let i = 0; i < rows; i++) grid[i] = new Array<number>(columns).fill(0);
    grid[startCoordinates[0]][startCoordinates[1]] = -2;
    grid[goalCoordinates[0]][goalCoordinates[1]] = 2;
    return grid;
}

const start: [number, number] = [15,15];
const goal: [number, number] = [7,7];
const availableBrushes: BrushTypes[] = ['Obstacle Brush', 'Erase Brush', 'Inactive Brush'];

const initialState: PathfindingState = {
    grid: generateGrid(start, goal),
    startCoordinates: start,
    goalCoordinates: goal,
    activeBrush: 'Obstacle Brush',
    availableBrushes: availableBrushes,
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
        clearVisited: (state) => {
            let newGrid = copyGrid(state.grid);
            for(let i = 0; i < newGrid.length; i++){
                for(let j = 0; j < newGrid[i].length; j++){
                    if(newGrid[i][j] === 1) newGrid[i][j] = 0;
                }
            }
            state.grid = newGrid;
        },
        setActiveBrush: (state, action: PayloadAction<BrushTypes>) => {
            state.activeBrush = action.payload;
        }
    },
});


export const { update, updateCoordinates, clearVisited, setActiveBrush } = pathfindingSlice.actions;

export default pathfindingSlice.reducer;