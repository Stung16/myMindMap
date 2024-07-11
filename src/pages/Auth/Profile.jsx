import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import UploadImage from "@/components/custom/UploadImage";
import { useSWRConfig } from "swr";
import { updateProfile } from "@/services/user.service";

export default function Profile() {
  const { mutate } = useSWRConfig();
  const profile = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setName(profile?.name);
    setDesc(profile?.desc);
  }, [profile]);
  let avatar = profile?.avatar;

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (files?.length) {
        const formData = new FormData();
        files.forEach((file) => formData.append("file", file));
        const res = await fetch(`${api}/api/upload`, {
          method: "POST",
          body: formData,
        }).then((res) => res.json());
        if (res?.status === 201) {
          avatar = res?.data?.url;
        }
      }
      const payload = {
        name,
        avatar,
        desc,
      };
      const resUpdata = await updateProfile(payload);
      if (resUpdata?.data?.status === 200) {
        mutate("/api/auth/profile");
        window.location.reload()
        toast.success("Update profile success!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something has error!!!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="relative px-10 pt-10">
        <h3 className="mb-4 text-2xl font-bold capitalize">Profile</h3>
        <div className="flex flex-col w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>This is my profile</CardDescription>
            </CardHeader>
            <CardContent className="px-8">
              <form
                onSubmit={handleSubmitProfile}
                className="flex items-start gap-10"
              >
                <div className="mt-2 w-[500px] flex flex-col gap-4 pb-6">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="Name">Name</Label>
                    <Input
                      type="text"
                      size="md"
                      variant="bordered"
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={name}
                    />
                  </div>

                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">Description</Label>
                    <Textarea
                      placeholder="Enter your description"
                      id="message"
                      key="description"
                      onChange={(e) => setDesc(e.target.value)}
                      defaultValue={desc}
                    />
                  </div>
                  <Button className="bg-black text-white">Save changes</Button>
                </div>
                <UploadImage
                  userInfo={profile}
                  onFiles={setFiles}
                  files={files}
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white opacity-70">
          <Loading />
        </div>
      )}  
    </div>
  );
}
