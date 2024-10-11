import api from "./index"
interface markResolvedProblemParam { 
  id: string
}
interface getProblemListParam {
  index: number
  size: number
}
export const getRandomProblem = async () => { 
  try {
    const res = await api.get("/problem/random")
    // return res
    console.log("服务器", res)
    if (res.data.statusCode === 1) {
      return res.data.data
    } else {
      return false
    }
  } catch (err) {
    console.log('服务器', err)
    return false
  }
}


export const markResolvedProblem = async (params:markResolvedProblemParam) => { 
  try {
    const res = await api.post("/problem/solved/mark",params)
    if (res.data.statusCode === 1) {
      return res.data
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

export const markUnresolvedProblem = async (params: markResolvedProblemParam) => { 
  try {
    const res = await api.post("/problem/solved/unmark", params)
    if (res.data.statusCode === 1) {
      return res.data
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getResolvedProblemList = async (params:getProblemListParam) => {
  try {
    const res = await api.post("/problem/solved/list", params)
    if (res.data.statusCode === 1) {
      return res.data
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getResolvedProblemSum = async () => {
  try {
    const res = await api.get("/problem/solved/list/size")
    if (res.data.statusCode === 1) {
      return res.data
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}