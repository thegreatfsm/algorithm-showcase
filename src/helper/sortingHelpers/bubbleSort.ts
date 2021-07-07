import { ListElement } from '../../store/listElements/listElementsSlice';

export const bubbleSort = (items: ListElement[], progress: (items: ListElement[]) => void) => {
    internalBubbleSort(items, progress);
}

const internalBubbleSort = (items: ListElement[], progress: (items: ListElement[]) => void) => {
    let i: number, j: number;
    for(i = 0; i < items.length; i++){
        for(j = 0; j < items.length - 1 - i; j++){
            if(items[j].value > items[j+1].value){
                swap(items,j,j+1);
                progress(items);
            }
        }
    }
}

const swap = (items: ListElement[], i: number, j: number) => {
    let temp = items[i];
    items[i] = items[j];
    items[j] = temp;
}