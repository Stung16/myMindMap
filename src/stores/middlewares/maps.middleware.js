import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  handleCreateMap,
  deleteMindmaps,
  deleteForceMindmap,
  deleteMindmap,
  getAllMindmap,
  getAllMindmapDeleted,
  getMindmapDetail,
  restoreMindmaps,
  restoreMindmap,
  updateMindmap,
} from "@/services/mindmap.service"

export const requestGetAllMindmap = createAsyncThunk(
  "maps/getAllMindmap",
  async ({ userId, page, limit }) => {
    return await getAllMindmap({ userId, page, limit })
  }
)

export const requestCreateMindmap = createAsyncThunk(
  "maps/createMindmap",
  async (payload) => {
    return await handleCreateMap(payload)
  }
)

export const requestGetAllMindmapDeleted = createAsyncThunk(
  "maps/getAllMindmapDeleted",
  async ({ userId, page, limit }) => {
    return await getAllMindmapDeleted({ userId, page, limit })
  }
)

export const requestGetMindmapDetail = createAsyncThunk(
  "maps/getMindmapDetail",
  async (id) => {
    const res = await getMindmapDetail(id)
    return res.data
  }
)

export const requestUpdateMindmap = createAsyncThunk(
  "maps/updateMindmap",
  async ({ id, payload }) => {
    const res = await updateMindmap({ id, payload })
    return res.data
  }
)

export const requestDeleteMindmap = createAsyncThunk(
  "maps/deleteMindmap",
  async (id) => {
    const res = await deleteMindmap(id)
    return res.data
  }
)

export const requestDeleteAllMindmap = createAsyncThunk(
  "maps/deleteAllMindmap",
  async ({ ids: listIds }) => {
    const res = await deleteMindmaps({ ids: listIds })
    console.log("res de:", res)
    return res.data
  }
)

export const requestDeleteForceMindmap = createAsyncThunk(
  "maps/deleteForceMindmap",
  async (id) => {
    return await deleteForceMindmap(id)
  }
)

export const requestRestoreMindmap = createAsyncThunk(
  "maps/restoreMindmap",
  async (id) => {
    const res = await restoreMindmap(id)
    return res.data
  }
)

export const requestRestoreAllMindmap = createAsyncThunk(
  "maps/restoreAllMindmap",
  async (ids) => {
    return await restoreMindmaps(ids)
  }
)
