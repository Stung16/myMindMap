import queryString from "query-string";
import TrashIcon from "@/icons/TrashIcon";
import MapsList from "../Mindmaps/MapsList";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import Navigate from "../Mindmaps/Nav";
import { Helmet } from "react-helmet";

function Trash() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const query = {
    page,
    limit: 5,
    id: userInfo.id,
    q: search,
  };
  const queryStringified = queryString.stringify(query);
  const apiServer = `/api/delete/mindmaps?${queryStringified}`;
  const { data: maps, isLoading } = useSWR(apiServer, fetcher);
  const pages = useMemo(() => {
    return maps?.count ? Math.ceil(maps?.count / query.limit) : 0;
  }, [maps?.count, query.limit]);
  console.log(maps);
  return (
    <div className="relative">
      <Helmet>
        <title>Trashed Maps | Mindmap</title>
        <meta name="description" content="trashed mindmap" />
      </Helmet>
      <Navigate onSearch={setSearch} />
      {!isLoading && (
        <p className="text-lg">
          {search ? `${maps?.count} results for "${search}"` : ""}
        </p>
      )}
      {isLoading && (
        <div className="w-full absolute inset-0 opacity-70 h-[100vh] bg-white flex items-center justify-center">
          <Loading />
        </div>
      )}
      {maps?.count > 0 ? (
        <div>
          <MapsList
            type="trash"
            data={maps?.mindmaps}
            loading={isLoading}
            pages={pages}
            page={page}
            apiServer={apiServer}
            onPage={setPage}
            deleted={true}
          />
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center justify-center text-gray h-[calc(100vh-200px-25px)]">
            <TrashIcon className="w-32 h-32 text-gray1" />
            <p className="mt-6 text-black">Trash Empty</p>
            <p>There are no deleted items.</p>
          </div>
        )
      )}
    </div>
  );
}

export default Trash;
