import { ListElement } from '../../store/listElements/listElementsSlice';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';
import { insertionSort } from './insertionSort';
import { bubbleSort } from './bubbleSort';
const availableSorts: {[key: string]: (items: ListElement[], progress: (items: ListElement[]) => void) => void } = {
    'Quick Sort' : quickSort,
    'Heap Sort' : heapSort,
    'Insertion Sort' : insertionSort,
    'Bubble Sort' : bubbleSort,
};


export { availableSorts }; 