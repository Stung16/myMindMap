import { handleChangePassword } from "@/services/auth.service";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading";

const ProfileSetting = () => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const handleSubmitPassword = async (data) => {
    try {
      setLoading(true);
      if (watch("password") !== watch("rePassword")) {
        setError("checkPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
      }
      if (watch("password") === watch("rePassword")) {
        const res = await handleChangePassword({
          password: data.password,
          repeat_password: data.rePassword,
        });
        if (res?.data?.status === 200) {
          mutate("/api/auth/profile");
          toast.success("Change password success!");
          reset();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something error!");
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
              <CardTitle>Update Password</CardTitle>
            </CardHeader>
            <CardContent className="px-8">
              <form
                onSubmit={handleSubmit(handleSubmitPassword)}
                className="flex items-start gap-10"
              >
                <div className="mt-2 w-[500px] flex flex-col gap-4 pb-6">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="pass">New Password</Label>
                    <Input
                      id="pass"
                      type="password"
                      {...register("password", {
                        pattern: /^.{8,}$/,
                        required: true,
                      })}
                      size="md"
                      variant="bordered"
                    />
                    <p className="text-[#dc3545]">
                      {errors.password &&
                        "Password must have at least 8 characters"}
                    </p>
                  </div>
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="ConfirmPass">Confirm New Password</Label>
                    <Input
                      id="ConfirmPass"
                      type="password"
                      {...register("rePassword", {
                        pattern: /^.{8,}$/,
                        required: true,
                      })}
                      size="md"
                      variant="bordered"
                    />
                    <p className="text-[#dc3545]">
                      {errors.rePassword &&
                        "Password must have at least 8 characters"}
                    </p>
                    <p className="text-[#dc3545]">
                      {!errors.rePassword &&
                        errors.checkPassword &&
                        errors.checkPassword.message}
                    </p>
                  </div>
                  <Button className="bg-black text-white py-3">
                    Save changes
                  </Button>
                </div>
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
};

export default ProfileSetting;
