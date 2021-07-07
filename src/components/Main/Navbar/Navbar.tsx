import React from 'react';
import {
    Link
} from "react-router-dom";
import { Toolbar, Typography, AppBar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import './Navbar.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        marginRight: '3%',
    },
    navbar: {
    }
  }),
);

const Navbar = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.navbar} position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link className="Link" to="/sort">Sorting</Link>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    <Link className="Link" to="/pathfind">Pathfinding</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;