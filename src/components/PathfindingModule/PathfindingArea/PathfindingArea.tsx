import React from 'react';
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import GridElement from './GridElement/GridElement';
import { useAppSelector } from '../../../hooks/storeHooks';
import { brushFactory, shouldUpdate } from '../../../helper/pathfindingHelpers/pathfindingBrushes/brushFactory';
import './PathfindingArea.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: 'auto',
    }
  }),
);

const constructGrid = (grid: (-2|-1|0|1|2)[][], updateFunc: (pos: [number,number]) => void, activeBrush: string) => {
    const rows = grid.length;
    const columns = grid[0].length
    let gridElements: JSX.Element[] = [];
    for(let i = 0; i < rows; i++){
        let gridRow: JSX.Element[] = [];
        for(let j = 0; j < columns; j++){
            const onMouseMove = brushFactory(shouldUpdate[activeBrush][0](grid[i][j]), updateFunc, [i,j]);
            gridRow.push(<GridElement onMouseMove={onMouseMove} key={`r${i}c${j}`} value={grid[i][j]} />);
        }
        gridElements.push(<Grid key={`r${i}`} container item>{gridRow}</Grid>)
    }
    return gridElements;
}

const PathfindingArea: React.FC = () => {
    const classes = useStyles();
    const activeBrush = useAppSelector((state) => state.pathfinding.activeBrush);
    const grid = useAppSelector((state) => state.pathfinding.grid) as (-2|-1|0|1|2)[][];
    const gridElements = grid ? constructGrid(grid, (pos: [number, number]) => {shouldUpdate[activeBrush][1](pos)}, activeBrush) : [];
    return(<div className='PathfindingArea'><Grid className={classes.root} direction='column' container>{gridElements}</Grid></div>);
}

export default PathfindingArea;