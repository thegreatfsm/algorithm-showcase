import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrushTypes } from '../../helper/pathfindingHelpers/pathfindingBrushes/brushFactory';
import { OnClickTypes } from '../../helper/pathfindingHelpers/pathfindingOnClick/onClickFactory';


interface PathfindingState {
    grid: number[][];
    startCoordinates: [number, number];
    goalCoordinates: [number, number];
    activeBrush: BrushTypes;
    availableBrushes: BrushTypes[];
    activeOnClick: OnClickTypes;
    disabledControls: boolean;
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

const start: [number, number] = [10,7];
const goal: [number, number] = [10,26];
const availableBrushes: BrushTypes[] = ['Obstacle Brush', 'Erase Brush', 'Inactive Brush'];

const initialState: PathfindingState = {
    grid: generateGrid(start, goal),
    startCoordinates: start,
    goalCoordinates: goal,
    activeBrush: 'Inactive Brush',
    availableBrushes: availableBrushes,
    activeOnClick: 'Inactive Onclick',
    disabledControls: false,
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
        setDefault: state => initialState,
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
        },
        setStartOnClick: (state) => {
            state.activeBrush = 'Inactive Brush';
            state.activeOnClick = 'Start Onclick';
        },
        setGoalOnClick: (state) => {
            state.activeBrush = 'Inactive Brush';
            state.activeOnClick = 'Goal Onclick';
        },
        setStart: (state, action: PayloadAction<[number, number]>) => {
            let newGrid = copyGrid(state.grid);
            newGrid[state.startCoordinates[0]][state.startCoordinates[1]] = 0;
            newGrid[action.payload[0]][action.payload[1]] = -2;
            state.activeBrush = 'Inactive Brush';
            state.activeOnClick = 'Inactive Onclick';
            state.startCoordinates = action.payload;
            state.grid = newGrid;
        },
        setGoal: (state, action: PayloadAction<[number, number]>) => {
            let newGrid = copyGrid(state.grid);
            newGrid[state.goalCoordinates[0]][state.goalCoordinates[1]] = 0;
            newGrid[action.payload[0]][action.payload[1]] = 2;
            state.activeBrush = 'Inactive Brush';
            state.activeOnClick = 'Inactive Onclick';
            state.goalCoordinates = action.payload;
            state.grid = newGrid;
        },
        disableControls: (state) => {
            state.activeBrush = 'Inactive Brush';
            state.activeOnClick = 'Inactive Onclick';
            state.disabledControls = true;
        },
        enableControls: (state) => {
            state.disabledControls = false;
        }
    },
});


export const { update, setDefault, updateCoordinates, clearVisited, setActiveBrush, setStartOnClick, setGoalOnClick, setStart, setGoal, disableControls, enableControls } = pathfindingSlice.actions;

export default pathfindingSlice.reducer;