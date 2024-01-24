import React, { useCallback, useLayoutEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  useReactFlow,
} from 'reactflow';

import 'reactflow/dist/style.css';
import BodyNode from './BodyNode';
import InjuryNode from './InjuryNode';
import data from './exampleInjuryData.json';
import getLayoutedElements from './getLayoutedElements';

const casualtyInjuries = data.casualtyInjuries;
function getBodyData() {
  const handles: any[] = [];
  const ids: string[] = [];
  casualtyInjuries.forEach(item => {
    const id = `${item.location}-${item.subLocation}-${item.lateralPosition}`;
    if (!ids.includes(id)) {
      handles.push({
        id,
        color: item.categoryColor
      });
    }
  });

  return { handles };
}

const nodeTypes = {
  injury: InjuryNode,
  body: BodyNode,
};

export default function Component() {

  const initialNodes = [
    { id: 'body', type: 'body', position: { x: 0, y: 0 }, data: getBodyData() },
    ...casualtyInjuries.map(item => {
      return {
        type: 'injury',
        id: item.label,
        data: item,
        position: { x: 0, y: 0 }
      }
    })
  ];
  
  const initialEdges = [
    ...casualtyInjuries.map(item => {
      return {
        type: 'straight',
        id: `body-${item.label}`,
        source: 'body',
        target: item.label,
        sourceHandle: `${item.location}-${item.subLocation}-${item.lateralPosition}`,
        style: { stroke: item.categoryColor, strokeWidth:2 }
      }
    })
  ];

  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useLayoutEffect(() => {
    getLayoutedElements(nodes, edges).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      window.requestAnimationFrame(() => fitView());

    })
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: 'black' }}
        fitView
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
