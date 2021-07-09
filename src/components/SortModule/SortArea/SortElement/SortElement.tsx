import React from 'react';
import { motion } from 'framer-motion';
import './SortElement.css';

export interface IProps {
    value: number;
    height: string;
    width: string;
}

const spring = {
    type: "spring",
    damping: 25,
    stiffness: 200
};

const SortElement: React.FC<IProps> = (props) => {
    return (
        <motion.li className='SortElementUnit' layout
        transition={spring} style={{'width': props.width}} >
            <div className='SortContent' >{props.value}</div>
            <div className='SortElementUnit' style={{'height': '100%', 'width':'100%'}}><div className='SortContent SortBar' style={{'height': props.height}}></div></div>
        </motion.li>
    );
}

export default SortElement;