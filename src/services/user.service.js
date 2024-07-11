import { client } from "@/utils/clientUtils"

export const checkUserFromIdReset = async ({ idReset }) => {
  try {
    const res = await client.post(`/auth/checkUserFromIdReset`, { idReset })
    return res
  } catch (error) {
    console.error(error)
  }
}

export const updateProfile = async (payload) => {
  try {
    const data = await client.post(`/api/user`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
}
