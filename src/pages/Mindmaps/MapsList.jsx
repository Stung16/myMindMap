import * as React from "react";
import moment from "moment";
import { FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { MdFavorite } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {  ChevronDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Cookies from "js-cookie";
import MapsIcon from "@/icons/MapsIcon";
import { useSelector } from "react-redux";
import {
  deleteForceMindmap,
  deleteMindmap,
  deleteMindmaps,
  restoreMindmap,
  restoreMindmaps,
  updateMindmap,
} from "@/services/mindmap.service";

function MapsList({
  data,
  loading,
  onPage,
  page,
  pages,
  type,
  apiServer,
  deleted,
}) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { mutate } = useSWRConfig();
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = [
    {
      id: "select",
      header: ({ table }) => {
        const payload = {
          ids: table
            .getGroupedSelectedRowModel()
            .rows?.map((item) => item?.original?.id),
        };
        return (
          <div className="relative w-[30px]">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(!!value);
              }}
              aria-label="Select all"
            />
            {(table.getFilteredSelectedRowModel()?.rows?.length > 1 ||
              table.getIsAllPageRowsSelected()) && (
              <span className="absolute left-[30px] top-[-5px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4 outline-none border-none " />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-white opacity-1"
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      className="flex items-center gap-2 hover:bg-[#eee]"
                      disabled={deleted ? true : false}
                      onClick={async () => {
                        try {
                          const res = await deleteMindmaps(payload);
                          if (res?.data?.status === 200) {
                            toast.success("Deleted!!!");
                            table.resetRowSelection();
                            mutate(apiServer);
                          } else {
                            toast.error("Đã có lỗi xảy ra");
                          }
                        } catch (error) {
                          toast.error("Đã có lỗi xảy ra");
                        }
                      }}
                    >
                      <FaTrashRestore className="text-[#f7578c] text-[18px] " />
                      <span>Deletes</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center gap-2 hover:bg-[#eee]"
                      disabled={!deleted ? true : false}
                      onClick={async () => {
                        try {
                          const res = await restoreMindmaps(payload);
                          if (res?.data?.status === 200) {
                            toast.success("Success!!!");
                            table.resetRowSelection();
                            mutate(apiServer);
                          } else {
                            toast.error("Đã có lỗi xảy ra");
                          }
                        } catch (error) {
                          toast.error("Đã có lỗi xảy ra");
                        }
                      }}
                    >
                      <FaTrashRestore className="text-[#f7578c] text-[18px] " />
                      <span>Recovery all</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={!deleted ? true : false}
                      className="flex items-center gap-2 hover:bg-[#eee]"
                      onClick={async () => {
                        const payload = {
                          ids: table
                            .getGroupedSelectedRowModel()
                            .rows?.map((item) => item?.original?.id),
                        };
                        try {
                          const res = await deleteMindmaps(payload);
                          if (res?.data?.status === 200) {
                            toast.success("Deleted!!!");
                            table.resetRowSelection();
                            mutate(apiServer);
                          } else {
                            toast.error("Đã có lỗi xảy ra");
                          }
                        } catch (error) {
                          toast.error("Đã có lỗi xảy ra");
                        }
                      }}
                    >
                      <FaRegTrashCan className="text-[#f7578c] text-[18px] " />
                      <span>Delete recovery all </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: () => {
        return <div className="text-left">Name</div>;
      },
      cell: ({ row }) => (
        <a
          href={`/my-mindmap/${row?.original?.id}`}
          className="lowercase cursor-pointer"
        >
          {row.getValue("title")}
        </a>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize flex items-center gap-3">
          {row.getValue("status") ? (
            <Badge
              variant="outline"
              className={"bg-green-400 text-[#fff] font-thin"}
            >
              Public
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className={"bg-[#f7578c] text-[#fff] font-thin"}
            >
              Private
            </Badge>
          )}
          <div className="w-2 ">
            {row.original.favorite && (
              <MdFavorite className="text-[15px] text-[#F7578C]" />
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: () => <div className="text-right">Modified</div>,
      cell: ({ row }) => {
        const created_at = row.getValue("created_at");
        return (
          <div className="text-right font-medium">
            {moment(`${created_at}`).format("MMM Do YY")}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4 outline-none border-none" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white ">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="hover:bg-[#eee]"
                disabled={deleted ? true : false}
                onClick={() => {
                  if (userInfo?.id !== payment.user_id) {
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    return (window.location.href = "/");
                  }
                  if (userInfo?.id === payment.user_id && payment.status) {
                    toast.success("copied!!!");
                    navigator.clipboard.writeText(payment.id);
                  } else {
                    toast.error("Map isn't public!!!");
                  }
                }}
              >
                Copy link map
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:bg-[#eee]"
                disabled={deleted ? true : false}
                onClick={async () => {
                  try {
                    const res = await updateMindmap({
                      id: payment.id,
                      payload: {
                        favorite: !payment.favorite,
                      },
                    });
                    if (res?.data?.status === 200) {
                      toast.success("Success!!!");
                      mutate(apiServer);
                    } else {
                      toast.error("Đã có lỗi xảy ra");
                    }
                  } catch (error) {
                    toast.error("Đã có lỗi xảy ra");
                  }
                }}
              >
                <span>
                  {!payment.favorite ? "Add favorite" : "Remove favorite"}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-[#eee]"
                onClick={async () => {
                  try {
                    if (!deleted) {
                      const res = await deleteMindmap(payment.id);
                      if (res?.data?.status === 200) {
                        toast.success("Deleted!!!");
                        mutate(apiServer);
                      } else {
                        toast.error("Đã có lỗi xảy ra");
                      }
                    } else {
                      const res = await deleteForceMindmap(payment.id);
                      if (res?.data?.status === 200) {
                        toast.success("Deleted!!!");
                        mutate(apiServer);
                      } else {
                        toast.error("Đã có lỗi xảy ra");
                      }
                    }
                  } catch (error) {
                    console.log(error);
                    toast.error("Đã có lỗi xảy ra");
                  }
                }}
              >
                {deleted ? "Delete recovery" : "Delete this map"}
              </DropdownMenuItem>
              {deleted && (
                <DropdownMenuItem
                  className="hover:bg-[#eee]"
                  onClick={async () => {
                    try {
                      const res = await restoreMindmap(payment.id);
                      if (res?.data?.status === 200) {
                        toast.success("Success!!!");
                        mutate(apiServer);
                      } else {
                        toast.error("Đã có lỗi xảy ra");
                      }
                    } catch (error) {
                      toast.error("Đã có lỗi xảy ra");
                    }
                  }}
                >
                  Recovery this map
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });
  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      onPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      onPage(page - 1);
    }
  }, [page]);
  return (
    <div className="relative mt-6">
      <div className="w-full h-full">
        {data?.length ? (
          <div className="w-full">
            <div className="flex items-center py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize hover:bg-[#eee]"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border border-[#ddd]">
              <Table className="min-h-[300px] overflow-y-scroll border-[#ddd]">
                <TableHeader>
                  {table?.getHeaderGroups()?.map((headerGroup) => (
                    <TableRow key={headerGroup?.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table?.getRowModel()?.rows?.length ? (
                    table?.getRowModel()?.rows?.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns?.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-2">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel()?.rows?.length} of{" "}
                {table.getFilteredRowModel()?.rows?.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPreviousPage}
                  disabled={pages === 0 || page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNextPage}
                  disabled={pages === 0 || page === pages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-normal h-full mt-[100px] items-center text-gray">
            <MapsIcon className="w-32 h-32 text-gray1" />
            <p className="text-black">
              This is your map listing ... but it empty.
            </p>
            <p>
              You can find all your maps here once you have some. Start creating
              and come back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapsList;
