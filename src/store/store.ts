import { configureStore } from '@reduxjs/toolkit';
import listElementsReducer from './listElements/listElementsSlice';
import pathfindingReducer from './pathfinding/pathfindingSlice';

export const store =  configureStore({
    reducer: {
        listElements: listElementsReducer,
        pathfinding: pathfindingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;