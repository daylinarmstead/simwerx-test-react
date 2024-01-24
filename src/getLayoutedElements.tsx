import { Edge, Node } from "reactflow";
import ELK from 'elkjs/lib/elk.bundled.js';
const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '10',
  'elk.spacing.nodeNode': '10',
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]): Promise<any> => {
  const isHorizontal = true;
  const graph: any = {
    elkOptions,
    id: 'root',
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      // Hardcode a width and height for elk to use when layouting.
      width: node.type === 'body' ? 500 : 150,
      height:  50,
    })),
    edges: edges.sort((a, b) => {
      if ((a.sourceHandle || '') < (b.sourceHandle || '')) return -1;
      if ((a.sourceHandle || '' )> (b.sourceHandle || '')) return 1;
      return 0;
  }),
  };

  return elk
    .layout(graph)
    .then((layoutedGraph: any) => ({
      nodes: layoutedGraph.children.map((node: any) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

export default getLayoutedElements;