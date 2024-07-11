import { client } from "@/utils/clientUtils";

export const handleCreateMap = async (payload) => {
  try {
    const res = await client.post("/api/mindmaps", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMindmap = async ({ userId, page, limit }) => {
  try {
    const res = await client.get(
      `/mindmaps?userId=${userId}&page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllMindmapDeleted = async ({ userId, page, limit }) => {
  try {
    const res = await client.get(
      `/mindmaps/deleted?userId=${userId}&page=${page}&limit=${limit}`
    );
    console.log("res:", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMindmapDetail = async (id) => {
  try {
    const data = await client.get(`/api/mindmaps/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMindmap = async ({ id, payload }) => {
  try {
    const data = await client.patch(`/api/mindmaps/${id}`, payload);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMindmap = async (id) => {
  try {
    const res = await client.delete(`/api/mindmaps/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteForceMindmap = async (id) => {
  try {
    const res = await client.delete(`/api/deleted/mindmaps/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMindmaps = async (payload) => {
  try {
    const res = await client.post(`/api/deleted/mindmaps`, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const restoreMindmap = async (id) => {
  try {
    const res = await client.get(`/api/restore/mindmaps/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const restoreMindmaps = async (payload) => {
  try {
    const res = await client.post(`/api/restore/mindmaps`, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
