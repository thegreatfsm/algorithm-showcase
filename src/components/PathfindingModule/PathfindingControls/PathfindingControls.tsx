import React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { updateCoordinates, clearVisited, setActiveBrush } from '../../../store/pathfinding/pathfindingSlice';
import { availablePathfinders } from '../../../helper/pathfindingHelpers/pathfindingIndex';
import sleep from '../../../helper/miscHelpers/sleep';

const PathfindingControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const grid = useAppSelector((state) => state.pathfinding.grid);
    const startCoordinates = useAppSelector((state) => state.pathfinding.startCoordinates);
    const brushType = useAppSelector((state) => state.pathfinding.activeBrush);
    const availableBrushs = useAppSelector((state) => state.pathfinding.availableBrushes);

    const onTestClick = React.useCallback(() => {
        const updateGrid = async (coords: number[]) => {
            dispatch(updateCoordinates(coords));
            await sleep(10);
        }
        let gridCopy = [];
        for(let i = 0; i < grid.length; i++) gridCopy.push([...grid[i]]);
        availablePathfinders['DFS'](gridCopy, startCoordinates[0], startCoordinates[1], updateGrid);
    }, [dispatch, grid, startCoordinates]);

    const onClearVisitedClick = React.useCallback(() => {
        dispatch(clearVisited());
    }, [dispatch]);

    const onBrushTypeChange = React.useCallback((event) => {
        dispatch(setActiveBrush(event.target.value));
    }, [dispatch])

    return(
        <div>
            <Button onClick={onTestClick} variant='contained'>Test</Button>
            <Button onClick={onClearVisitedClick} variant='contained'>Clear Visited</Button>
            <FormControl>
                <InputLabel id='available-brushes'>Brush Type</InputLabel>
                <Select
                id='available-brushes'
                value={brushType}
                onChange={onBrushTypeChange}>
                    {availableBrushs.map(k => <MenuItem key={k} value={k}>{k}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}

export default PathfindingControls;