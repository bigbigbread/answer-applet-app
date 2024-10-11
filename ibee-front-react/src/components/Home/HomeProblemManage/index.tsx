import React, { useEffect, useState } from 'react'
// import HomeTopData from './HomeTopData'
import { Table, Button, Modal, Upload, message, Popconfirm } from 'antd'
import { useProbleManageStore } from '@/store/probleManage'
import classes from './index.module.less'
import type { ColumnsType } from 'antd/es/table'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined } from '@ant-design/icons'
import './table.less'
import moment from 'moment'
import { uploadProblemPic, deleteProblem, editProblem } from '@/api/problem'
import Edit from './Edit'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import SearchOperate from '@/components/SearchOperate/Search'
interface DataType {
  topicId: string
  topicPic: string
  topicDiff: string
  topicFrom: string
  topicAnswerPic: string
  topicAlyPic: string
  topicType: string
  topicRemarkPer: string
  topicUpdate: string
}
const renderText = (text: string) => {
  return (
    <div
      style={{
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 14,
        fontWeight: '700'
      }}
    >
      {text}
    </div>
  )
}

const HomeProblemManage: React.FC = () => {
  const {
    setProblemList,
    getProblemList,
    getProblemListSize,
    init,
    isUpdate,
    changeUpdate
  } = useProbleManageStore()
  const [dataShow, setDataShow] = useState<DataType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pageNum, setPageNum] = useState<number>(1)
  const [openModel, setOpenModel] = useState<boolean>(false)
  const [modelType, setModelType] = useState<string>('')
  const [nowEditRow, setNowEditRow] = useState<any>({})
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const showModal = (type: string) => {
    setOpenModel(true)
    setModelType(type)
  }
  const [uploadProblmData, setUploadProblmData] = useState({
    id: '',
    imgBinaryData: new Uint8Array(),
    type: 0
  })
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    // 删除图片的时候，将imgBinaryData置为null
    if (newFileList.length === 0) {
      setUploadProblmData({
        ...uploadProblmData,
        imgBinaryData: new Uint8Array()
      })
    }
  }
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const handleOk = async () => {
    try {
      if (!uploadProblmData.imgBinaryData.length) {
        message.error('请上传图片')
        return
      }
      try {
        const problemPic = await uploadProblemPic(
          {
            problemId: uploadProblmData.id,
            imageTypeNumber: uploadProblmData.type
          },
          uploadProblmData.imgBinaryData
        )
        if (problemPic === 'success') {
          message.success('上传图片成功')
          console.log('刷新数据')
          await getFecthData(pageNum - 1, paginationProps.pageSize)
        } else if (problemPic === 'fail') {
          message.error('上传图片失败')
        }
      } catch (e) {
        message.error('上传图片失败')
        console.log(e)
      }
      // 关闭弹窗
      setOpenModel(false)
      // 清除图片
      setFileList([])
      // 重新获取数据
    } catch (error) {
      message.error('上传图片失败')
      console.log(error)
    }
  }
  const handleCancel = () => {
    setOpenModel(false)
    // 清除图片
    setFileList([])
  }
  const renderImg = (text: string, record: any, index: any, title: string) => {
    if (!text) {
      return (
        <div
          style={{
            position: 'relative',
            minHeight: '100px'
          }}
        >
          <Button
            type="primary"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => {
              console.log(record, index, title)
              showModal(title)
              // setNowProblemId(record.topicId)
              if (title === 'content') {
                setUploadProblmData({
                  ...uploadProblmData,
                  id: record.topicId,
                  type: 0
                })
              } else if (title === 'analysis') {
                setUploadProblmData({
                  ...uploadProblmData,
                  id: record.topicId,
                  type: 1
                })
              } else if (title === 'answer') {
                setUploadProblmData({
                  ...uploadProblmData,
                  id: record.topicId,
                  type: 2
                })
              }
            }}
          >
            待上传
          </Button>
        </div>
      )
    } else {
      return (
        <div style={{}}>
          <img
            src={text}
            style={{
              display: 'flex',
              width: '100%',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
            onClick={() => {
              console.log(record, index, title)
              showModal(title)
              // setNowProblemId(record.topicId)
              if (title === 'content') {
                setUploadProblmData({
                  ...uploadProblmData,
                  id: record.topicId,
                  type: 0
                })
              } else if (title === 'analysis') {
                setUploadProblmData({
                  ...uploadProblmData,
                  id: record.topicId,
                  type: 1
                })
              } else if (title === 'answer') {
                setUploadProblmData({
                  ...uploadProblmData,
                  id: record.topicId,
                  type: 2
                })
              }
            }}
            alt="题目图片"
          />
        </div>
      )
    }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '题目编号',
      dataIndex: 'topicId',
      rowScope: 'row',
      align: 'center',
      width: '8%',
      // 高度居中
      render: renderText,
      ellipsis: true
    },
    {
      title: '题目图片',
      dataIndex: 'topicPic',
      align: 'center',
      width: '18%',
      render: (Text: any, record: any, index: any) => {
        return renderImg(Text, record, index, 'content')
      }
    },
    {
      title: '难度',
      dataIndex: 'topicDiff',
      align: 'center',
      width: '6%',
      render: renderText
    },
    {
      title: '备注',
      dataIndex: 'topicType',
      align: 'center',
      width: '8%',
      render: renderText
    },
    {
      title: '题目来源',
      dataIndex: 'topicFrom',
      align: 'center',
      width: '10%',
      render: renderText
    },
    {
      title: '解析图片',
      dataIndex: 'topicAlyPic',
      align: 'center',
      width: '18%',
      render: (Text: any, record: any, index: any) => {
        return renderImg(Text, record, index, 'analysis')
      }
    },
    {
      title: '答案图片',
      dataIndex: 'topicAnswerPic',
      align: 'center',
      width: '18%',
      render: (Text: any, record: any, index: any) => {
        return renderImg(Text, record, index, 'answer')
      }
    },
    {
      title: '录题人',
      dataIndex: 'topicRemarkPer',
      align: 'center',
      width: '10%',
      render: renderText
    },
    {
      title: '更新时间',
      dataIndex: 'topicUpdate',
      align: 'center',
      width: '10%',
      render: (text: string) => {
        return renderText(moment(text).format('YYYY-MM-DD HH:mm:ss'))
      }
    },
    {
      title: '操作',
      dataIndex: 'topicOperate',
      fixed: 'right',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Button
            onClick={() => {
              setNowEditRow({
                ...record
              })
              console.log('nowEditRow', nowEditRow)
              setShowEditModal(true)
            }}
            type="primary"
          >
            编辑
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Popconfirm
            title="Delete the problem"
            description="确定要删除这项吗？"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              try {
                const res = await deleteProblem(record.topicId)
                if (res === 'success') {
                  message.success('删除成功')
                  await getFecthData(pageNum - 1, paginationProps.pageSize)
                  init()
                } else if (res === 'fail') {
                  message.error('删除失败')
                } else {
                  message.error('服务器错误')
                }
                console.log(res)
              } catch (error) {
                message.error('网络错误')
              }
            }}
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ]
  const paginationProps = {
    current: pageNum, // 当前页数
    pageSize: 8, // 每页条数
    total: getProblemListSize(), // 数据总数
    onChange: (page: number) => handlePageChange(page), // 改变页码函数
    hideOnSinglePage: false,
    showTotal: (total: number) => `共 ${total} 条`,
    // 变化时的回调函数
    onShowSizeChange: (current: number, size: number) => {
      console.log(current, size)
    }
    // 页脚变化
  }
  const getFecthData = async (page: number, size: number) => {
    setLoading(true)
    await setProblemList(page, size)
    setDataShow(
      getProblemList().map((item: any) => {
        return {
          topicId: item.id,
          topicPic: item.problemContentImg || '',
          topicDiff:
            item.level === 1 ? '简单' : item.level === 2 ? '中等' : '困难',
          topicFrom: item.source,
          topicAlyPic: item.problemAlyImg || '',
          topicAnswerPic: item.problemAnsImg || '',
          topicType: item.noteInfo || '',
          topicRemarkPer: item.creator || '未知',
          topicUpdate: item.createTime
        }
      })
    )
    setLoading(false)
  }
  useEffect(() => {
    init()
    ;(async () => {
      await getFecthData(0, paginationProps.pageSize)
    })()
  }, [])
  useEffect(() => {
    if (isUpdate) {
      ;(async () => {
        await getFecthData(pageNum - 1, paginationProps.pageSize)
      })()
      changeUpdate(false)
    }
  }, [isUpdate])
  // 表格分页的信息改变时触发
  const handlePageChange = async (page: number) => {
    await getFecthData(page - 1, paginationProps.pageSize)
    setPageNum(page)
  }
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Edit
          editModal={showEditModal}
          editData={nowEditRow}
          editModelFc={(showEditModal) => {
            setShowEditModal(showEditModal)
          }}
          editDataFc={async (newEditData) => {
            setNowEditRow(newEditData)
            console.log('newEditData', newEditData)
            // 传递数据给后端
            try {
              const res = await editProblem({
                id: newEditData.topicId,
                level: newEditData.topicDiff,
                noteInfo: newEditData.topicType,
                source: newEditData.topicFrom
              })
              console.log(res)
              if (res === 'success') {
                message.success('编辑成功')
                await getFecthData(pageNum - 1, paginationProps.pageSize)
                init()
              } else if (res === 'fail') {
                message.error('编辑失败')
              } else {
                message.error('服务器错误')
              }
            } catch (error) {
              console.log(error)
            }
          }}
        />
      </div>
      <Modal
        title="上传图片"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          {modelType === 'content' && '题目内容'}
        </p>
        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          {modelType === 'answer' && '题目答案'}
        </p>
        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          {modelType === 'analysis' && '题目解析'}
        </p>
        <ImgCrop
          rotationSlider
          aspect={16 / 9}
          quality={1}
          modalWidth="60%"
          modalTitle="裁剪图片"
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            maxCount={1}
            onRemove={() => {
              setUploadProblmData({
                ...uploadProblmData,
                imgBinaryData: new Uint8Array()
              })
            }}
            beforeUpload={(file) => {
              setUploadProblmData({
                ...uploadProblmData,
                imgBinaryData: new Uint8Array()
              })
              // 如果是图片，就返回true，否则返回false
              const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png'
              if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!')
              }
              const isLt2M = file.size / 1024 / 1024 < 1.5
              if (!isLt2M) {
                message.error('Image must smaller than 1.5MB!')
                setTimeout(() => {
                  setFileList([])
                }, 1000)
              }
              return isJpgOrPng && isLt2M
            }}
            customRequest={async (options: any) => {
              const { file, onSuccess, onError } = options as any
              // 将这个文件图片转化成二进制的形式
              const reader = new FileReader()
              reader.readAsArrayBuffer(file as Blob)
              reader.onload = (e: any) => {
                console.log('e', e.target.result)
                const imgBinaryData = new Uint8Array(e.target.result)
                if (imgBinaryData.length) {
                  setUploadProblmData((prevUploadData) => ({
                    ...prevUploadData,
                    imgBinaryData: imgBinaryData
                  }))
                  // console.log('imgBinaryData', uploadProblmData)
                  onSuccess('ok')
                }
                // 如果imgBinaryData存在，就调用onSuccess，否则调用onError
                else {
                  console.log('error')
                  onError('error')
                }
              }
            }}
            style={{
              width: 200
            }}
          >
            {fileList.length < 1 && (
              <Button
                className={classes['modal-upload-wrapper-button']}
                icon={<UploadOutlined />}
              >
                Upload
              </Button>
            )}
          </Upload>
        </ImgCrop>
      </Modal>
      {/* <div>
        <HomeTopData />
      </div> */}
      <div className={classes['home-content-top']}>
        <SearchOperate />
      </div>
      <div className={classes['home-table-wrapper']}>
        <Table
          columns={columns}
          className={classes['home-table']}
          dataSource={dataShow}
          bordered
          rowKey={(record) => record.topicId}
          loading={loading}
          pagination={paginationProps}
          size="small"
          scroll={{
            y: 'calc(100vh - 280px)'
            // y: 0
          }}
          rowClassName={() => {
            return classes['home-table-row']
          }}
        />
      </div>
    </>
  )
}

export default HomeProblemManage
