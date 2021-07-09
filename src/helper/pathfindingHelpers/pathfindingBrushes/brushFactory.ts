import { MouseEvent } from "react";
import { updateCoordinates } from "../../../store/pathfinding/pathfindingSlice";
import { store } from "../../../store/store";



export const brushFactory = (shouldUpdate: boolean, updateFunc: (pos: [number, number]) => void, pos: [number, number]) => {
        return (e: MouseEvent<HTMLDivElement>) => {
            if((e.buttons === 1 || e.buttons === 3) && shouldUpdate){
                updateFunc(pos);
            } 
        }
}

export const shouldUpdate: {[key: string]: [(gridvalue: number) => boolean, (pos: [number, number]) => void]} = {
    'Obstacle Brush' : [(gridValue: number) => gridValue === 0, (pos: [number, number]) => store.dispatch(updateCoordinates([...pos, -1]))],
    'Erase Brush': [(gridValue: number) => gridValue === -1, (pos: [number, number]) => store.dispatch(updateCoordinates([...pos, 0]))],
    'Inactive Brush': [(gridValue: number) => false, (pos: [number, number]) => {}],
}

export type BrushTypes = 'Obstacle Brush' | 'Erase Brush' | 'Inactive Brush';  

