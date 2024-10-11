import api from './index'
interface ProblemsParams {
  level: number
  source: string
  noteInfo: string
}
interface ProblemsResParams {
  statusCode: number
  statusMsg: string
  data: any
}
interface UploadPromblesParams {
  problemId: string
  imageTypeNumber: number
}
export const createProblem = async (
  params: ProblemsParams
): Promise<string> => {
  try {
    const res: ProblemsResParams = await api.post('/problem/create', params)
    if (res.statusCode === 1) {
      return res.data.id
    } else {
      return 'fail'
    }
  } catch (e) {
    return 'error'
  }
}

export const uploadProblemPic = async (
  params: UploadPromblesParams,
  ImgBuffer: Uint8Array
): Promise<string> => {
  try {
    const res: ProblemsResParams = await api.post(
      '/problem/uploadImage',
      ImgBuffer,
      {
        // headers: {}
        params: params
      }
    )

    if (res.statusCode === 1) {
      console.log('上传成功', res)
      return 'success'
    } else {
      console.log('上传报错了', res)
      return 'fail'
    }
  } catch (e) {
    return 'error'
  }
}

export const deleteProblem = async (params: string): Promise<string> => {
  try {
    const res: ProblemsResParams = await api.post(
      '/problem/delete',
      undefined,
      {
        params: {
          problemId: params
        }
      }
    )
    if (res.statusCode === 1) {
      console.log(res)
      return 'success'
    } else {
      return 'fail'
    }
  } catch (e) {
    return 'error'
  }
}

export const getSumProblems = async (): Promise<string> => {
  try {
    const res: ProblemsResParams = await api.get('/problem/list/size')
    if (res.statusCode === 1) {
      return res.data.size
    } else {
      return 'fail'
    }
  } catch (e) {
    return 'error'
  }
}

export const getProblemListApi = async (params: {
  index: number
  size: number
}): Promise<string> => {
  const problemList: any = []
  try {
    let res: any = await api.get('/problem/list', {
      params: {
        pageIndex: params.index,
        pageSize: params.size
      }
    })
    if (typeof res === 'string') {
      res = eval('(' + res + ')')
    }
    if (res.statusCode === 1 && res.data) {
      // 处理data数据获得题目图片

      const problemListData = res.data
      for (const item of problemListData) {
        const problemId = item.id
        const problemTypeContent = item.state['0']
        const problemTypeAly = item.state['1']
        const problemTypeAns = item.state['2']
        let problemContentImg: any = ''
        let problemAlyImg: any = ''
        let problemAnsImg: any = ''
        if (problemTypeContent) {
          // problemContentImg = await getBase64(problemContentImg.data)
          problemContentImg = `https://ibee-calculus-site.oss-rg-china-mainland.aliyuncs.com/problem/${problemId}/0?random=${Math.random()}`
        }
        if (problemTypeAly) {
          problemAlyImg = `https://ibee-calculus-site.oss-rg-china-mainland.aliyuncs.com/problem/${problemId}/1?random=${Math.random()}`
        }
        if (problemTypeAns) {
          problemAnsImg = `https://ibee-calculus-site.oss-rg-china-mainland.aliyuncs.com/problem/${problemId}/2?random=${Math.random()}`
        }

        problemList.push({
          ...item,
          problemContentImg: problemContentImg,
          problemAlyImg: problemAlyImg,
          problemAnsImg: problemAnsImg
        })
      }
      return problemList
    } else {
      return 'fail'
    }
  } catch (e) {
    console.log(e)
    return 'error'
  }
}

export const editProblem = async (params: {
  id: string
  level: number
  source: string
  noteInfo: string
}): Promise<string> => {
  try {
    console.log('edit', params)
    const res: ProblemsResParams = await api.post('/problem/modify', params)
    console.log('edit', res)
    if (res.statusCode === 1) {
      return 'success'
    } else {
      return 'fail'
    }
  } catch (e) {
    return 'error'
  }
}
