import React from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import SortArea from './SortArea/SortArea';
import SortSnapShot from './SortSnapShot/SortSnapShot'
import SortControls from './SortControls/SortControls';

const SortModule: React.FC = () => {
    const total = useAppSelector((state) => state.listElements.listElementsSnapshots.length);
    return(
        <React.Fragment>
            <SortArea />
            {total > 0 ? <SortSnapShot /> : undefined }
            <SortControls />
        </React.Fragment>
    );
}

export default SortModule;