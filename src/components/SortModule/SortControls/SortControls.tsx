import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { saveSnapShot, clearSnapShots, update, ListElement } from '../../../store/listElements/listElementsSlice';
import { Button, Slider, Typography, TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { availableSorts } from '../../../helper/sortingHelpers/sortIndex';
import './SortControls.css';

const SortControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const listElements = useAppSelector((state) => state.listElements.listElements);
    const [rangeValues, setRangeValues] = React.useState([0,100]);
    const [generateAmount, setGenerateAmount] = React.useState(10);
    const [sortType, setSortType] = React.useState('Quick Sort')

    const onRangeChange = React.useCallback((event, newValue) => {
        setRangeValues(newValue);
    }, []);

    const onSortTypeChange = React.useCallback((event) => {
        setSortType(event.target.value);
    }, []);

    const onGenerateAmountChange = React.useCallback((event) => {
        setGenerateAmount(+event.target.value);
    }, [setGenerateAmount]);

    const onGenerateClick = React.useCallback(() => {
        let newArr: ListElement[] = []
        const max = rangeValues[1];
        const min = rangeValues[0];
        for(let i = 0; i < generateAmount; i++){
            newArr.push({key: i, value: Math.floor(Math.random() * (max - min)) + min});
        }
        dispatch(clearSnapShots());
        dispatch(update(newArr));
    }, [dispatch, generateAmount, rangeValues]);

    const onSortClick = React.useCallback(() => {
        const saveSnap = (items: ListElement[]) => {
            dispatch(saveSnapShot(items));
        }
        var sortArray = [...listElements];
        dispatch(clearSnapShots());
        dispatch(saveSnapShot(sortArray));
        availableSorts[sortType](sortArray, saveSnap);
        dispatch(update(sortArray));
    }, [listElements, dispatch, sortType]);

    return (
        <div>
            <div className='SortControlsRow'>
                <div className='SortControlsUnit'>
                    <TextField type='number' id='generate-amount'value={generateAmount} onChange={onGenerateAmountChange}></TextField>
                    <Button onClick={onGenerateClick} variant='contained' color='primary'>Generate</Button>
                </div>
                <div className='SortControlsUnit'>
                    <FormControl>
                        <InputLabel id='available-sorts'>Sort Type</InputLabel>
                        <Select
                        id='available-sorts'
                        value={sortType}
                        onChange={onSortTypeChange}>
                            {Object.keys(availableSorts).map(k => <MenuItem key={k} value={k}>{k}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button onClick={onSortClick} variant='contained'>Sort</Button>
                </div>
            </div>
            <div className='ValueRange'>
                <Typography id='range-slider'>Value range</Typography>
                <Slider value={rangeValues} 
                onChange={onRangeChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider" />
            </div>
        </div>
    );
}

export default SortControls;