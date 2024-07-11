import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode.jsx";
import { generateRandomId } from "@/utils/mapUtil.js";
import CustomEdge from "@/components/custom/CustomEdge.jsx";

const edgeTypes = {
  "custom-edge": CustomEdge,
};
const AddNodeOnEdgeDrop = ({ onUpdateMaps, dataMap, edge_type }) => {
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState( dataMap?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(dataMap?.edges || []) ;
  const [selectedIdNode, setSelectedIdNode] = useState(null);
  const [selectedIdEdge, setSelectedIdEdge] = useState(null);

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: edge_type };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges, edge_type]
  );
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");
      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = generateRandomId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { value: `New node` },
          origin: [0.5, 0.0],
          type: "textUpdater",
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
            type: edge_type,
          })
        );
      }
    },
    [screenToFlowPosition, setEdges, setNodes, edge_type]
  );

  const deleteKey = (e) => {
    if (e.key === "Delete" && selectedIdNode && selectedIdNode !== "1") {
      setNodes((nodes) => nodes.filter((node) => node.id !== selectedIdNode));
    }

    if (e.key === "Delete" && selectedIdEdge) {
      setEdges((edges) => edges.filter((edge) => edge.id !== selectedIdEdge));
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", deleteKey);
    return () => {
      document.addEventListener("keyup", deleteKey);
    };
  }, [selectedIdNode, setNodes, selectedIdEdge, setEdges]);



  useEffect(() => {
    setNodes(dataMap?.nodes);
    setEdges(dataMap?.edges);
  }, [dataMap]);

  useEffect(() => {
    onUpdateMaps({
      nodes,
      edges,
    });
  }, [nodes, edges, onUpdateMaps,edge_type]);
  useEffect(() => {
    const newEdges = edges?.map((item) => {
      return { ...item, type: edge_type };
    });
    setEdges(newEdges);
  }, [edge_type]);
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.ctrlKey && event.key === "s") {
  //       // Xử lý sự kiện Ctrl + S ở đây
  //       event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt (ví dụ: lưu trang)
  //       handlesavemap();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [handlesavemap, edges, nodes, edge_type]);









  
  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        deleteKeyCode={null}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => {
          setSelectedIdNode(node.id);
        }}
        onEdgeClick={(_, edge) => {
          setSelectedIdEdge(edge.id);
        }}
        attributionPosition="bottom-left"
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        <Background variant="dots" />
        <MiniMap nodeColor={nodeColor} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
function nodeColor(node) {
  if (node.id === "0") {
    return "#00aaff";
  } else {
    return "#ff0072";
  }
}

export default AddNodeOnEdgeDrop;
