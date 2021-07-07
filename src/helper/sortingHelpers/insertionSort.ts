import { ListElement } from '../../store/listElements/listElementsSlice';

export const insertionSort = (items: ListElement[], progress: (items: ListElement[]) => void) => {
    internalInsertionSort(items, progress);
}

const internalInsertionSort = (items: ListElement[], progress: (items: ListElement[]) => void) => {
    let key: ListElement, i: number, j: number;
    for(i = 1; i < items.length; i++){
        key = items[i];
        j = i - 1;
        while(j >= 0 && items[j].value > key.value){
            items[j + 1] = items[j];
            j--;
        }
        items[j + 1] = key;
        progress(items);
    }
}