import React from 'react';
import { motion } from 'framer-motion';
import './GridElement.css';


export interface IProps{
    /** Maps to GridElementType */
    value: (-2|-1|0|1|2);
}

const classes: Map<number, string> = new Map([
    [-2, 'Start'],
    [-1, 'Obstacle'],
    [0, 'Unvisited'],
    [1, 'Visited'],
    [2, 'Goal'],
]);

const GridElement = (props: IProps) => {
    return(<motion.div className={`${classes.get(props.value)} GridElement`}></motion.div>);
}

export default GridElement;