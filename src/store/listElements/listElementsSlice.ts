import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListElement {
    key: number;
    value: number;
}
interface ListElementsState {
    listElements: ListElement[];
    listElementsSnapshots: ListElement[][];
    snapshot: number;
    max: number;
}

const initialState: ListElementsState = {
    listElements: [],
    listElementsSnapshots: [],
    snapshot: -1,
    max: -1,
}

export const listElementsSlice = createSlice({
    name: 'listElements',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<ListElement[]>) => {
            state.listElements = [...action.payload];
            state.max = Math.max(...[...action.payload].map(le => le.value));
            state.snapshot = state.listElementsSnapshots.length - 1;
        },
        saveSnapShot: (state, action: PayloadAction<ListElement[]>) => {
            state.listElementsSnapshots = [...state.listElementsSnapshots, [...action.payload]];
        },
        clearSnapShots: (state) => {
            state.listElementsSnapshots = [];
        },
        incrementSnapShot: (state) => {
            if(state.snapshot < state.listElementsSnapshots.length - 1){
                state.snapshot = state.snapshot + 1;
                var newLE = state.listElementsSnapshots[state.snapshot];
                state.listElements = [...newLE];
                state.max = Math.max(...[...newLE].map(le => le.value));
            }
        },
        decrementSnapShot: (state) => {
            if(state.snapshot > 0){
                state.snapshot = state.snapshot - 1;
                var newLE = state.listElementsSnapshots[state.snapshot];
                state.listElements = [...newLE];
                state.max = Math.max(...[...newLE].map(le => le.value));
            } 
        },
        firstSnapShot: (state) => {
            state.snapshot = 0;
            var newLE = state.listElementsSnapshots[state.snapshot];
            state.listElements = [...newLE];
            state.max = Math.max(...[...newLE].map(le => le.value));
        },
        lastSnapShot: (state) => {
            state.snapshot = state.listElementsSnapshots.length - 1;
            var newLE = state.listElementsSnapshots[state.snapshot];
            state.listElements = [...newLE];
            state.max = Math.max(...[...newLE].map(le => le.value));
        }
    },
});

export const { update, saveSnapShot, clearSnapShots, incrementSnapShot, decrementSnapShot, firstSnapShot, lastSnapShot } = listElementsSlice.actions;

export default listElementsSlice.reducer;