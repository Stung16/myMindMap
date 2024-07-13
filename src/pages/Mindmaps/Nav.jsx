
import Avatar from "@/components/Avatar";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { edges, node_1, node_2, node_3 } from "@/utils/mapUtil";
import { handleCreateMap } from "@/services/mindmap.service";
import Search from "@/components/Search";
import CreateDefault from "@/components/custom/CreateDefault";
import ButtonCreatMap from "@/components/ButtonCreateMap";

const heading = {
  "/my-mindmap": "My Maps",
  "/maps/favorite": "Favorite Maps",
  "/maps/public": "Public Maps",
  "/maps/trashed": "Trashed Maps",
};
function Navigate({ onSearch, onLoading, data }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const createMindmap1 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}~1`,
      user_id: userInfo?.id,
      nodes: node_1,
      edges: edges,
      edge_type: "default",
    };
    try {
      onLoading(true);
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        navigate(`/my-mindmap/${idMap}~1`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onLoading(false);
    }
  };
  const createMindmap2 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}~2`,
      user_id: userInfo?.id,
      nodes: node_2,
      edges: edges,
      edge_type: "default",
    };
    try {
      onLoading(true);
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        navigate(`/my-mindmap/${idMap}~2`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onLoading(false);
    }
  };
  const createMindmap3 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}~3`,
      user_id: userInfo?.id,
      nodes: node_3,
      edges: [],
      edge_type: "default",
    };
    try {
      onLoading(true);
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        navigate(`/my-mindmap/${idMap}~3`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onLoading(false);
    }
  };
  const createMindmap4 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}~4`,
      user_id: userInfo?.id,
      nodes: node_3,
      edges: [],
      edge_type: "straight",
    };
    try {
      onLoading(true);
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        navigate(`/my-mindmap/${idMap}~4`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onLoading(false);
    }
  };
  return (
    <div className="min-h-[200px]">
      <div className="flex items-center justify-between w-full rounded-tl-xl">
        <h3 className="text-2xl">{heading[pathname]}</h3>
        <div className="flex items-center gap-3">
          <Search onSearch={onSearch} data={data} />
          <Avatar user={userInfo} />
        </div>
      </div>
      <div className="flex gap-4">
        {pathname !== "/maps/trashed" && (
          <>
            <CreateDefault user_id={userInfo?.id} />
            <ButtonCreatMap
              src={
                "https://res.cloudinary.com/dtht61558/image/upload/v1715068232/chart-map_uyw3tw.svg"
              }
              name="Org chart"
              onClick={createMindmap1}
            />
            <ButtonCreatMap
              src={
                "https://res.cloudinary.com/dtht61558/image/upload/v1715068254/project-retrospective_wewkho.svg"
              }
              name="Retrospective"
              onClick={createMindmap2}
            />
            <ButtonCreatMap
              src={
                "https://res.cloudinary.com/dtht61558/image/upload/v1715068310/project-plan_nadx6x.svg"
              }
              name="mindmap"
              onClick={createMindmap3}
            />
            <ButtonCreatMap
              src={
                "https://res.cloudinary.com/dtht61558/image/upload/v1715068323/smart-goals_b0mwt5.svg"
              }
              name="Retrospective"
              onClick={createMindmap4}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Navigate;
