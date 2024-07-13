import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import ContentEditable from "react-contenteditable";
import { IoIosArrowBack } from "react-icons/io";
import Avatar from "@/components/Avatar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Flow from "./Flow";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import { Helmet } from "react-helmet";
import { setType } from "@/stores/slices/maps.slice";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";
import { updateMindmap } from "@/services/mindmap.service";
import BtnShare from "@/components/custom/BtnShare";

function Detail() {
  const [values, setValues] = useState("default");
  const { id } = useParams();
  const type = id?.split("~")[1];
  const loadingDetailMap = useSelector((state) => state.maps.loading);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data, isLoading } = useSWR(`/api/mindmaps/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { mutate } = useSWRConfig();
  const [title, setTitle] = useState(
    data?.mindmap?.title || "Không có tiêu đề mindmap"
  );
  const [desc, setDesc] = useState(data?.mindmap?.desc || "Chưa có mô tả");
  
  useEffect(() => {
    setValues(data?.mindmap?.edge_type || "default");
    setTitle(data?.mindmap?.title || "Không có tiêu đề mindmap");
    setDesc(data?.mindmap?.desc || "Chưa có mô tả");
    document.title = data?.mindmap?.title;
  }, [data, id]);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setType(type));
  }, [id]);

  const [updateMaps, setUpdateMaps] = useState(null);

  useEffect(() => {
    document.title = data?.mindmap?.title || "Loading...";
  }, [data?.mindmap]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    const payload = {
      ...updateMaps,
      title: title,
      desc: desc,
      updated_at: new Date(),
    };
    try {
      console.log(payload);
      const res = await updateMindmap({ id, payload });
      if (res?.data?.status === 200) {
        toast.success("Update success!");
        mutate(`/api/mindmaps/${id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleChangeTitle = (evt) => {
    if (evt.target.value !== "") {
      document.title = formattedContent(evt.target.value);
      setTitle(formattedContent(evt.target.value));
    } else {
      document.title = "Không có tiêu đề mindmap";
      setTitle("Không có tiêu đề mindmap");
    }
  };
  const handleChangeDesc = (evt) => {
    setDesc(evt.target.value);
  };
  if (loadingDetailMap && loadingUpdate) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }
  if (!data?.mindmap?.status && !data?.mindmap?.user_id === userInfo?.id) {
    return <NotFound />;
  }
  const formattedContent = (content) => {
    return content?.replaceAll("&nbsp;", " ");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>{data?.mindmap?.title}</title>
        <meta name="description" content={data?.mindmap?.desc} />
        <meta property="og:title" content={data?.mindmap?.title} />
        <meta property="og:description" content={data?.mindmap?.desc} />
        <meta property="og:image" content={data?.mindmap?.image} />
      </Helmet>
      <div className="flex items-start mt-5 px-[35px] gap-6">
        <div className="w-[90%] flex items-start gap-8">
          <Link
            to={"/my-mindmap"}
            className="flex items-center gap-1 px-6 py-3 mb-3 text-black bg-white border border-solid rounded-full border-[#ddd] shadow-md w-max whitespace-normal min-w-[180px] hover:shadow-xl transition-all"
          >
            <IoIosArrowBack fontSize={"1.3rem"} />
            my mindmap
          </Link>
          <div className="flex flex-col">
            <ContentEditable
              className={`heading-1 !text-2xl outline-none ${
                data?.mindmap?.status || userInfo?.id === data?.mindmap?.user_id
                  ? ""
                  : "select-none"
              }`}
              html={title}
              disabled={
                data?.mindmap?.status || userInfo?.id === data?.mindmap?.user_id
                  ? false
                  : true
              }
              onKeyDown={handleKeyDown}
              onChange={handleChangeTitle}
            />
            <ContentEditable
              html={desc || ""}
              onKeyDown={handleKeyDown}
              className={`mt-2 text-xl font-thin text-black outline-none ${
                data?.mindmap?.status || userInfo?.id === data?.mindmap?.user_id
                  ? ""
                  : "select-none"
              }`}
              disabled={
                data?.mindmap?.status || userInfo?.id === data?.mindmap?.user_id
                  ? false
                  : true
              }
              onChange={handleChangeDesc}
            />
          </div>
        </div>
        {!userInfo ||
        (userInfo &&
          !data?.mindmap?.status &&
          !data?.mindmap?.id === userInfo?.id) ? (
          <></>
        ) : (
          <div className="flex gap-6 ml-auto w-[60%] justify-end">
            {/* <Edges_types setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} /> */}
            <div className="relative">
              <Label className="absolute left-[6px] top-[-8px] bg-white dark:bg-black p-[2px]">
                Edge type
              </Label>
              <Select
                onValueChange={setValues}
                defaultValue={values}
                value={values}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="edges type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem className="hover:bg-[#eee]" value="straight">
                    straight
                  </SelectItem>
                  <SelectItem className="hover:bg-[#eee]" value="smoothstep">
                    smoothstep
                  </SelectItem>
                  <SelectItem className="hover:bg-[#eee]" value="default">
                    default
                  </SelectItem>
                  <SelectItem className="hover:bg-[#eee]" value="step">
                    step
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              className="btn-primary !rounded-full h-10 px-4 flex gap-2 items-center"
              onClick={handleUpdate}
            >
              <FaSave fontSize={"1.2rem"} />
              Save
            </button>
            <BtnShare status={data?.mindmap?.status} id={id}/>
            <Avatar user={userInfo} />
          </div>
        )}
      </div>

      <div className="h-[calc(100vh-6.5rem)]">
        <Flow
          id={id}
          onUpdateMaps={setUpdateMaps}
          dataMap={data?.mindmap}
          edge_type={values}
        />
      </div>
    </>
  );
}

export default Detail;
