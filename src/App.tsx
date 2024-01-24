import React from 'react';
import Component from './Component';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
      <Component />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
