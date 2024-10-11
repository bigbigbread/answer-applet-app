/**
 *  负责创建Store的方法与Action方法
 * */
import { getSumProblems, getProblemListApi } from '@/api/problem'
import { create } from 'zustand'
import { initProblemList } from './initialState'
const useProbleManageStore = create((set: any, get: any) => ({
  // 问题列表
  name: 'probleManage',
  ...initProblemList,
  // 设置问题列表
  setProblemList: async (index: number, size: number) => {
    // const res = await getProblemList()
    const problemlistRes = await getProblemListApi({
      index: index,
      size: size
    })
    return set(() => ({
      problemList: problemlistRes
    }))
  },
  // 获得问题列表
  getProblemList: () => {
    return get().problemList
  },
  // 设置问题列表大小
  setProblemListSize: async () => {
    const problemSizeRes = await getSumProblems()
    set(() => ({
      // 数据获得
      problemListSize: problemSizeRes
    }))
  },
  getProblemListSize: () => {
    return get().problemListSize
  },
  // 刷新问题列表
  changeUpdate: (flag: boolean) => {
    set(() => ({
      isUpdate: flag
    }))
  },
  // 执行初始化
  init: async () => {
    await get().setProblemListSize()
  }
}))

export default useProbleManageStore
