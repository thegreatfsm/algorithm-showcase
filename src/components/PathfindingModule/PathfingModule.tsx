import React from 'react';
import PathfindingArea from './PathfindingArea/PathfindingArea';
import PathfindingControls from './PathfindingControls/PathfindingControls';

const PathfindingModule = () => {
    return(
        <React.Fragment>
            <PathfindingArea />
            <PathfindingControls />
        </React.Fragment>
    );
}

export default PathfindingModule;