
import { ReactFlowProvider } from "reactflow";
import AddNodeOnEdgeDrop from "./AddNodeOnEdgeDrop";

function Flow({ id, onUpdateMaps, dataMap, edge_type }) {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop
        id={id}
        onUpdateMaps={onUpdateMaps}
        dataMap={dataMap}
        edge_type={edge_type}
      />
    </ReactFlowProvider>
  );
}

export default Flow;
