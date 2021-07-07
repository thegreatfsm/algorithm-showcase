import React from 'react';
import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { updateCoordinates } from '../../../store/pathfinding/pathfindingSlice';
import { availablePathfinders } from '../../../helper/pathfindingHelpers/pathfindingIndex';
import sleep from '../../../helper/miscHelpers/sleep';

const PathfindingControls = () => {
    const dispatch = useAppDispatch();
    const grid = useAppSelector((state) => state.pathfinding.grid);
    const onTestClick = React.useCallback(() => {
        const updateGrid = async (coords: number[]) => {
            dispatch(updateCoordinates(coords));
            await sleep(10);
        }
        let gridCopy = [];
        for(let i = 0; i < grid.length; i++) gridCopy.push([...grid[i]]);
        availablePathfinders['DFS'](gridCopy, 0, 0, updateGrid);
    }, [dispatch, grid]);

    return(<div><Button onClick={onTestClick} variant='contained'>Test</Button></div>)
}

export default PathfindingControls;