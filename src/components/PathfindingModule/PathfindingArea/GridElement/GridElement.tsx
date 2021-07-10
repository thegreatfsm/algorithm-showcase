import React, {MouseEvent} from 'react';
import { motion } from 'framer-motion';
import './GridElement.css';


export interface IProps{
    /** Maps to GridElementType */
    value: (-2|-1|0|1|2);
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
    onClick: () => void;
}

/*const classes: Map<number, string> = new Map([
    [-2, 'Start'],
    [-1, 'Obstacle'],
    [0, 'Unvisited'],
    [1, 'Visited'],
    [2, 'Goal'],
]);*/
// {/*className={`${classes.get(props.value)} GridElement`} */}
const colors: Map<number, string> = new Map([
    [-2, '#4052b5'], //Start
    [-1, '#808080'], //Obstacle
    [0, '#bfbfbf'], //Unvisited
    [1, '#a1aade'], //Visited
    [2, '#128230'], //Goal
]); 


const GridElement:React.FC<IProps>  = (props) => {
    return(
    <motion.div className='GridElement' onClick={props.onClick} onMouseMove={props.onMouseMove} initial={{ backgroundColor: colors.get(props.value)}} animate={{backgroundColor: colors.get(props.value)}} ></motion.div>
    );
}

export default GridElement;