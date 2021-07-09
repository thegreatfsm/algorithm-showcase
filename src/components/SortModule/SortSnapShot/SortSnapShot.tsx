import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { incrementSnapShot, decrementSnapShot, firstSnapShot, lastSnapShot } from '../../../store/listElements/listElementsSlice';
import { Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import sleep from '../../../helper/miscHelpers/sleep';


const sortAnimation = async (increment: () => void, total: number, currentSnapshot: number) => {
    
    while(currentSnapshot < total){
        increment();
        await sleep(25);
        currentSnapshot++;
    }
}

const SortSnapShot:React.FC = () => {
    const dispatch = useAppDispatch();
    const currentSnapshot = useAppSelector((state) => state.listElements.snapshot) + 1;
    const total = useAppSelector((state) => state.listElements.listElementsSnapshots.length);

    const onFirstButtonClick = React.useCallback(() => {
        dispatch(firstSnapShot())
    }, [dispatch]);

    const onBackButtonClick = React.useCallback(() => {
        dispatch(decrementSnapShot());
    }, [dispatch]);

    const onForwardButtonClick = React.useCallback(() => {
        dispatch(incrementSnapShot());
    }, [dispatch]);

    const onLastButtonClick = React.useCallback(() => {
        dispatch(lastSnapShot())
    }, [dispatch]);

    const onPlayButtonClick = React.useCallback(() => {
        const increment = () => {
            dispatch(incrementSnapShot());
        }
        sortAnimation(increment, total, currentSnapshot);
    }, [dispatch, total, currentSnapshot]);

    return(
        <div>
            <Button onClick={onFirstButtonClick}><FirstPageIcon color='primary'/></Button>
            <Button onClick={onBackButtonClick}><ArrowBackIosIcon color='primary'/></Button>
            {currentSnapshot}/{total}
            <Button onClick={onForwardButtonClick}><ArrowForwardIosIcon color='primary'/></Button>
            <Button onClick={onLastButtonClick}><LastPageIcon color='primary'/></Button>
            <Button onClick={onPlayButtonClick}><PlayArrowIcon color='primary'/></Button>
        </div>
    );
}

export default SortSnapShot;