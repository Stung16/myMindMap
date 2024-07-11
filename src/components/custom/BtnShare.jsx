import { FaShare } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { updateMindmap } from "@/services/mindmap.service";
const BtnShare = ({ status, id }) => {
  let currentPath = window.location.href;
  const [checked, setChecked] = useState(false);
  const params = useParams();
  const onCopy = useCallback(() => {
    toast.success("Copied !");
  }, []);
  useEffect(() => {
    setChecked(status);
  }, [status]);
  const handlePublic = async () => {
    const res = await updateMindmap({
      id: id,
      payload: {
        status: checked,
      },
    });
    if (res.data?.status === 200) {
      toast.success("Lưu thành công!!!");
    } else {
      toast.error("Đã có lỗi xảy ra!!!");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="btn-secondary !rounded-full h-10 px-4 flex gap-2 items-center">
            <FaShare fontSize={"1.2rem"} />
            Share
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="relative items-center flex w-full px-2 my-6 border border-solid rounded-lg border-blue1">
              <Switch
                id="airplane-mode"
                className={`${checked && "bg-black"}`}
                checked={checked}
                onCheckedChange={() => {
                  setChecked(!checked);
                }}
              />
              <div
                className={`relative flex items-center w-full ml-2 ${
                  checked ? "opacity-100" : "opacity-0 invisible"
                }`}
              >
                <Input
                  id="link"
                  defaultValue={`${currentPath}/${params.id}`}
                  readOnly
                  className="w-full p-2 my-2 pr-8 rounded outline-none bg-[#f6f9fc] font-normal transition-all "
                />

                <Button type="submit" size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                  <CopyToClipboard onCopy={onCopy} text={window.location.href}>
                    <IoCopy className="h-4 w-4" />
                  </CopyToClipboard>
                  {/* <Copy className="h-4 w-4" /> */}
                </Button>
              </div>
              <span className="absolute text-sm top-[-12px] left-[12px] bg-white">
                Share link
              </span>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={handlePublic}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BtnShare;
