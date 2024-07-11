
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/Loading";
import PublicIcon from "@/icons/PublicIcon";
import MapsList from "../Mindmaps/MapsList";
import Navigate from "../Mindmaps/Nav";
import { Helmet } from "react-helmet";

function Public() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const query = {
    page,
    limit: 5,
    statuss: true,
    q: search,
  };
  const queryStringified = queryString.stringify(query);
  const { data: maps, isLoading } = useSWR(
    `/api/mindmaps?${queryStringified}`,
    fetcher
  );
  const pages = useMemo(() => {
    return maps?.count ? Math.ceil(maps?.count / query.limit) : 0;
  }, [maps, query.limit]);
  return (
    <div className="relative">
      <Helmet>
        <title>Public Maps | Mindmap</title>
        <meta name="description" content="public mindmap" />
      </Helmet>
      <Navigate onSearch={setSearch} onLoading={setLoading} />
      {!isLoading && (
        <p className="text-lg">
          {search ? `${maps?.metadata?.count} results for "${search}"` : ""}
        </p>
      )}
      {(isLoading || loading) && (
        <div className="absolute inset-0 z-20 h-[100vh] flex items-center justify-center w-full bg-white opacity-70">
          <Loading />
        </div>
      )}
      {maps?.count > 0 ? (
        <div>
          <MapsList
            type="public"
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
            <PublicIcon className="w-[240px] h-36" />
            <p className="mt-2 text-black">No Public Maps</p>
            <p className="w-[400px] text-center">
              You can make maps public via the context menu. Share your creation
              with the world.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Public;
