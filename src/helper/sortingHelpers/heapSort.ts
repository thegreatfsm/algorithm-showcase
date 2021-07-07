import { ListElement } from '../../store/listElements/listElementsSlice';

export const heapSort = (items: ListElement[], progress: (items: ListElement[]) => void) => {
    internalHeapSort(items, progress);
}

const internalHeapSort = (items: ListElement[], progress: (items: ListElement[]) => void) => {
    const n = items.length

    for(let i = Math.floor(n/2) - 1; i >= 0; i--){
        heapify(items, n, i, progress);
    }

    for(let i = n - 1; i >= 0; i--){
        swap(items, 0, i);
        progress(items);
        heapify(items, i, 0, progress);
    }
}

const heapify = (items: ListElement[], n: number, i: number, progress: (items: ListElement[]) => void) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if(l < n && items[l].value > items[largest].value) largest = l;
    if(r < n && items[r].value > items[largest].value) largest = r;

    if(i !== largest){
        swap(items, i, largest);
        progress(items);
        heapify(items, n, largest, progress);
    }
}

const swap = (items: ListElement[], i: number, j: number) => {
    let temp = items[i];
    items[i] = items[j];
    items[j] = temp;
}