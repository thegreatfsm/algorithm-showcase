import React from 'react';
import { Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import FlagIcon from '@material-ui/icons/Flag';
import AllOutIcon from '@material-ui/icons/AllOut';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { setDefault, updateCoordinates, clearVisited, setActiveBrush, setStartOnClick, setGoalOnClick, disableControls, enableControls } from '../../../store/pathfinding/pathfindingSlice';
import { availablePathfinders } from '../../../helper/pathfindingHelpers/pathfindingIndex';
import sleep from '../../../helper/miscHelpers/sleep';
import './PathfindingControls.css';

const PathfindingControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const grid = useAppSelector((state) => state.pathfinding.grid);
    const startCoordinates = useAppSelector((state) => state.pathfinding.startCoordinates);
    const brushType = useAppSelector((state) => state.pathfinding.activeBrush);
    const disabled = useAppSelector((state) => state.pathfinding.disabledControls);
    const availableBrushs = useAppSelector((state) => state.pathfinding.availableBrushes);

    const [searchType, setSearchType] = React.useState('DFS');

    const onSearchClick = React.useCallback(async () => {
        const updateGrid = async (coords: number[]) => {
            dispatch(updateCoordinates(coords));
            await sleep(10);
        }
        let gridCopy = [];
        for(let i = 0; i < grid.length; i++) gridCopy.push([...grid[i]]);
        dispatch(disableControls());
        await availablePathfinders[searchType](gridCopy, startCoordinates[0], startCoordinates[1], updateGrid);
        dispatch(enableControls());
    }, [dispatch, grid, startCoordinates, searchType]);

    const onClearVisitedClick = React.useCallback(() => {
        dispatch(clearVisited());
    }, [dispatch]);

    const onBrushTypeChange = React.useCallback((event) => {
        dispatch(setActiveBrush(event.target.value));
    }, [dispatch])

    const onSearchTypeChange = React.useCallback((event) => {
        setSearchType(event.target.value);
    }, [setSearchType])

    const onSetStartClick = React.useCallback(() => {
        dispatch(setStartOnClick());
    }, [dispatch])

    const onSetGoalClick = React.useCallback(() => {
        dispatch(setGoalOnClick());
    }, [dispatch])

    const onResetGridClick = React.useCallback(() => {
        dispatch(setDefault());
    }, [dispatch])

    return(
            <div className="PathfindingControls">
                <ButtonGroup>
                    <Button disabled={disabled} onClick={onSetStartClick} variant='contained' color='primary'>Set Start <AllOutIcon /></Button>
                    <Button disabled={disabled} onClick={onSetGoalClick} variant='contained' color='secondary'>Set Goal <FlagIcon /></Button>
                    <Button disabled={disabled} onClick={onResetGridClick} variant='contained'>Reset Grid</Button>
                </ButtonGroup>
                <Button disabled={disabled} onClick={onSearchClick} variant='contained'>Search</Button>
                <FormControl>
                    <InputLabel id='available-searches'>Search Type</InputLabel>
                    <Select
                    disabled={disabled}
                    id='available-searches'
                    value={searchType}
                    onChange={onSearchTypeChange}>
                        {Object.keys(availablePathfinders).map(k => <MenuItem key={k} value={k}>{k}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button disabled={disabled} onClick={onClearVisitedClick} variant='contained'>Clear Visited</Button>
                <FormControl>
                    <InputLabel id='available-brushes'>Brush Type</InputLabel>
                    <Select
                    disabled={disabled}
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