import React from 'react';
import SortElement from './SortElement/SortElement';
import { useAppSelector } from '../../../hooks/storeHooks';
import './SortArea.css';

const SortArea: React.FC = () => {
    const listElements = useAppSelector((state) => state.listElements.listElements);
    const max = useAppSelector((state) => state.listElements.max);
    const sortElements = listElements.map(v => <SortElement key={v.key} width={`${(1/listElements.length * 100).toString()}%`} height={`${(v.value/max * 100).toString()}%`} value={v.value}/>);
    return (
        <div className='SortArea'>
            <ul className='list'>
                {sortElements}
            </ul>
        </div>
    );
}

export default SortArea;