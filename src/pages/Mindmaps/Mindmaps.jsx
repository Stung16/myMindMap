import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MapsIcon from "@/icons/MapsIcon";
import MapsList from "./MapsList";
import queryString from "query-string";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/Loading";
import Navigate from "./Nav";
import { Helmet } from "react-helmet";

function Mindmaps() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const query = {
    page,
    limit: 5,
    q: search,
  };
  const queryStringified = queryString.stringify(query);
  const { data: maps, isLoading } = useSWR(
    `/api/mindmaps?${queryStringified}`,
    fetcher
  );
  const pages = useMemo(() => {
    return maps?.count ? Math.ceil(maps?.count / query.limit) : 0;
  }, [maps?.count, query.limit]);
  return (
    <div className="relative">
      <Helmet>
        <title>My mindmap | Mindmap</title>
        <meta name="description" content="my mindmap" />
      </Helmet>
      <Navigate
        onSearch={setSearch}
        onLoading={setLoading}
        data={maps?.count}
      />
      {!isLoading && (
        <p className="text-lg">
          {search ? `${maps?.count} results for "${search}"` : ""}
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
            type="maps"
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
          <div className="flex flex-col justify-normal h-[50vh] items-center text-gray">
            <MapsIcon className="w-32 h-32 text-gray1" />
            <p className="text-black">
              This is your map listing ... but it empty.
            </p>
            <p>
              You can find all your maps here once you have some. Start creating
              and come back later!
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Mindmaps;
