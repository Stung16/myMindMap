
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import MapsList from "../Mindmaps/MapsList";
import FavoriteIcon from "@/icons/FavoriteIcon";
import Navigate from "../Mindmaps/Nav";
import { Helmet } from "react-helmet";

function Favorite() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const query = {
    page,
    limit: 5,
    q: search,
    favorite: true,
  };
  const queryStringified = queryString.stringify(query);
  const { data: maps, isLoading } = useSWR(
    `/api/mindmaps?${queryStringified}`,
    fetcher
  );

  const pages = useMemo(() => {
    return maps?.count ? Math.ceil(maps?.count / query.limit) : 0;
  }, [maps, query.limit]);
  // const profile = useSelector((state) => state.profileData.profile);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Favorite Maps | Mindmap</title>
        <meta name="description" content="favorite mindmap" />
      </Helmet>
      <Navigate onSearch={setSearch} onLoading={setLoading} />
      {!isLoading && (
        <p className="text-lg">
          {search ? `${maps?.count} results for "${search}"` : ""}
        </p>
      )}
      {isLoading && (
        <div className="w-full h-[100vh] opacity-70 bg-white flex items-center justify-center">
          <Loading />
        </div>
      )}
      {maps?.count > 0 ? (
        <div>
          <MapsList
            type="favorite"
            data={maps?.mindmaps}
            loading={isLoading}
            pages={pages}
            page={page}
            apiServer={`/api/mindmaps?${queryStringified}`}
            onPage={setPage}
          />
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center justify-center text-gray h-[calc(100vh-200px-25px)]">
            <FavoriteIcon className="w-[240px] h-36" />
            <p className="mt-2 text-black">No Favorite Maps</p>
            <p className="w-[400px] text-center">
              You can favorite maps via the context menu, or simply drag them
              onto the sidebar item.
            </p>
          </div>
        )
      )}
    </>
  );
}

export default Favorite;
