import { ListElement } from '../../store/listElements/listElementsSlice';

export const quickSort = (items: ListElement[], progress: (items: ListElement[]) => void) => {
    internalQuickSort(items, 0, items.length - 1, progress);
}

const internalQuickSort = (items: ListElement[], low: number, high: number, progress: (items: ListElement[]) => void) => {
    if(low < high){
        let p = partition(items, low, high, progress);
        internalQuickSort(items, low, p - 1, progress);
        internalQuickSort(items, p + 1, high, progress);
    }
}

const partition = (items: ListElement[], low: number, high: number, progress: (items: ListElement[]) => void) => {
    let pivot = items[high].value;
    let i = low - 1;
    for(let j = low; j <= high; j++){
        if(items[j].value < pivot){
            i++;
            swap(items, i, j);
            if(i !== j) progress(items);
        }
    }
    swap(items, i + 1, high);
    if(i+1 !== high) progress(items);
    return (i+1);
}

const swap = (items: ListElement[], i: number, j: number) => {
    let temp = items[i];
    items[i] = items[j];
    items[j] = temp;
}