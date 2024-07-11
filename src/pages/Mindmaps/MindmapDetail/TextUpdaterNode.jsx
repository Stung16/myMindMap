import { useCallback, useEffect, useRef, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { useSelector } from "react-redux";

import "../../../assets/css/style.css";
export default function TextUpdaterNode({ data, isConnectable, ...rest }) {
  const type = useSelector((state) => state.maps.type);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const { setNodes } = useReactFlow();
  const refNode = useRef(null);
  const onDoubleClick = () => {
    setEditing(true);
  };
  const { id } = rest;
  const onChange = useCallback(
    (evt) => {
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === id) {
            const updatedNode = {
              ...node,
              data: { ...node.data, value: evt.target.value },
            };
            return updatedNode;
          }
          return node;
        });
      });
    },
    [rest, setNodes]
  );
  const onBlur = () => {
    setEditing(false);
  };
  const handleClick = () => {
    setIsClicked(true);
  };
  const handleOutsideClick = (e) => {
    if (refNode.current && !refNode.current.contains(e.target)) {
      setEditing(false);
      setIsClicked(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div
      ref={refNode}
      className={`text-updater-node-${type} ${isClicked && "clicked"} relative`}
      onDoubleClick={onDoubleClick}
      onClick={handleClick}
    >
      {+rest.id !== 1 && (
        <Handle
          type="target"
          position={type === "1" ? Position.Top : Position.Left}
          isConnectable={isConnectable}
        />
      )}
      {/* <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        isConnectableEnd={true}
      /> */}
      <div className="node-item">
        <input
          id="text"
          name="text"
          onChange={onChange}
          onBlur={onBlur}
          className={`${
            isEditing ? "showInput" : "nodrag inputnone pointer-events-none"
          }`}
          readOnly={!isEditing}
          value={data.value}
          defaultValue={data.label}
        />
      </div>
      <Handle
        type="source"
        position={type === "1" ? Position.Bottom : Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
}
