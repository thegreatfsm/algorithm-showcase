import React from 'react';
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import GridElement from './GridElement/GridElement';
import { useAppSelector } from '../../../hooks/storeHooks';
import './PathfindingArea.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: 'auto',
    }
  }),
);

const constructGrid = (grid: (-2|-1|0|1|2)[][]) => {
    
    const rows = grid.length;
    const columns = grid[0].length
    let gridElements: JSX.Element[] = [];
    for(let i = 0; i < rows; i++){
        let gridRow: JSX.Element[] = [];
        for(let j = 0; j < columns; j++){
            gridRow.push(<GridElement key={`r${i}c${j}`} value={grid[i][j]} />);
        }
        gridElements.push(<Grid key={`r${i}`} container item>{gridRow}</Grid>)
    }
    return gridElements;
}

const PathfindingArea = () => {
    const classes = useStyles();
    const grid = useAppSelector((state) => state.pathfinding.grid) as (-2|-1|0|1|2)[][];
    const gridElements = grid ? constructGrid(grid) : [];
    return(<div className='PathfindingArea'><Grid className={classes.root} direction='column' container>{gridElements}</Grid></div>);
}

export default PathfindingArea;