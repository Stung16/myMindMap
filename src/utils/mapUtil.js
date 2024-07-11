import { v4 as uuidv4 } from "uuid";

export const edges = [
  { id: "1-2", source: "1", target: "2" },
  { id: "1-3", source: "1", target: "3" },
];

export const node_1 = [
  {
    id: "1",
    data: { value: "My mindmap" },
    position: { x: 0, y: 0 },
    type: "textUpdater",
  },
  {
    id: "2",
    data: { value: "New node" },
    position: { x: 130, y: 100 },
    type: "textUpdater",
  },
  {
    id: "3",
    data: { value: "New node" },
    position: { x: -130, y: 100 },
    type: "textUpdater",
  },
];
export const node_2 = [
  {
    id: "1",
    data: { value: "My mindmap" },
    position: { x: -500, y: 155 },
    type: "textUpdater",
  },
  {
    id: "2",
    data: { value: "New node" },
    position: { x: -220, y: 60 },
    type: "textUpdater",
  },
  {
    id: "3",
    data: { value: "New node" },
    position: { x: -220, y: 220 },
    type: "textUpdater",
  },
];
export const node_3 = [
  {
    id: "1",
    data: { value: "My mindmap" },
    position: { x: 0, y: 0 },
    type: "textUpdater",
  },
];

export const generateRandomId = () => {
  return uuidv4();
};