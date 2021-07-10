import { setGoal, setStart } from "../../../store/pathfinding/pathfindingSlice";
import { store } from "../../../store/store";



export const onClickFactory = (updateFunc: (pos: [number, number]) => void, pos: [number, number]) => {
        return () => {
            console.log(pos);
            updateFunc(pos);
        }
}

export const clickUpdate: {[key: string]: (pos: [number, number]) => void} = {
    'Goal Onclick' : (pos: [number, number]) => store.dispatch(setGoal(pos)),
    'Start Onclick': (pos: [number, number]) => store.dispatch(setStart(pos)),
    'Inactive Onclick': (pos: [number, number]) => {},
};

export type OnClickTypes = 'Goal Onclick' | 'Start Onclick' | 'Inactive Onclick';  