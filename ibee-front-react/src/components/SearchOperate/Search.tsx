import React, { useState, useEffect } from 'react'
import { Button, Select, Input, Modal } from 'antd'
import classes from './search.module.less'
import './search_antd.less'
import { useProbleManageStore } from '@/store/probleManage'
import ImgShow from './ImgShow'
import {
  searchItem,
  handleOkFc,
  UploadProblemData,
  ProblemImg,
  uploadProblemImg,
  getImgPropsFc
} from './searchFC'
const SearchOperate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadProblmData, setUploadProblmData] = useState<UploadProblemData>({
    id: '',
    leve: 1,
    source: '',
    remark: ''
  })
  const { init, changeUpdate } = useProbleManageStore()
  const [nowProblemId, setNowProblemId] = useState('')
  const [shouldSendRequest, setShouldSendRequest] = useState(false)
  const [isImgModal, setIsImgModal] = useState(false)
  const [problemImg, setProblemImg] = useState<ProblemImg>({
    content: new Uint8Array(),
    answer: new Uint8Array(),
    analysis: new Uint8Array()
  })
  const [isUpdate, setIsUpdate] = useState(false)
  const [isClear, setIsClear] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    //createProblem 获得题目id
    await handleOkFc(
      uploadProblmData,
      setUploadProblmData,
      setIsModalOpen,
      setIsUpdate,
      setIsImgModal,
      setNowProblemId
    )
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    // 清空数据
    setUploadProblmData({
      id: '',
      leve: 1,
      source: '',
      remark: ''
    })
  }
  // 上传题目图片
  useEffect(() => {
    ;(async () => {
      await uploadProblemImg(
        shouldSendRequest,
        problemImg,
        nowProblemId,
        setIsClear,
        setShouldSendRequest,
        setIsImgModal,
        setProblemImg,
        init,
        changeUpdate
      )
    })()
  }, [problemImg, shouldSendRequest])
  useEffect(() => {
    if (isUpdate) {
      init()
      changeUpdate(true)
      setIsUpdate(false)
    }
  }, [isUpdate])
  return (
    <>
      <Modal
        title="新增题目"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={classes['modal']}
      >
        <div className={classes['modal-content']}>
          <div className={classes['modal-content-item']}>
            <div className={classes['modal-content-item-title']}>
              请选择题目level
            </div>
            <Select
              defaultValue="简单"
              style={{
                width: '40%'
              }}
              options={[
                { value: 1, label: '简单' },
                { value: 2, label: '中等' },
                { value: 3, label: '困难' }
              ]}
              className={classes['modal-type-wrapper-select']}
              onChange={(value) => {
                setUploadProblmData({
                  ...uploadProblmData,
                  leve: Number(value)
                })
              }}
            ></Select>
          </div>
          <div className={classes['modal-content-item']}>
            <div className={classes['modal-content-item-title']}>题目来源</div>
            <Input
              className={classes['.modal-content-item-comp']}
              placeholder="请输入题目来源"
              value={uploadProblmData.source}
              style={{
                width: '40%'
              }}
              onChange={(e) => {
                setUploadProblmData({
                  ...uploadProblmData,
                  source: e.target.value
                })
              }}
            />
          </div>
          <div className={classes['modal-content-item']}>
            <div className={classes['modal-content-item-title']}>备注</div>
            <Input
              placeholder="请输入备注"
              value={uploadProblmData.remark}
              style={{
                width: '40%'
              }}
              onChange={(e) => {
                setUploadProblmData({
                  ...uploadProblmData,
                  remark: e.target.value
                })
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={isImgModal}
        maskStyle={{
          backgroundColor: 'rgba(0,0,0,.45)'
        }}
        // width={800}

        title="上传图片的内容解析和答案"
        onOk={() => {
          console.log('problemImg', problemImg)
          setIsImgModal(false)
          // 上传题目图片
          setShouldSendRequest(true)
        }}
        onCancel={() => {
          setIsImgModal(false)
          // 清空数据
          // 清空Img
          setProblemImg({
            content: new Uint8Array(),
            answer: new Uint8Array(),
            analysis: new Uint8Array()
          })
        }}
      >
        <div className={classes['ImgShow-wrapper']}>
          <ImgShow
            imgName="题目内容"
            uploadFile={getImgPropsFc}
            isClear={isClear}
            problemImg={problemImg}
            setProblemImg={setProblemImg}
            changeClear={() => {
              setIsClear(false)
            }}
          ></ImgShow>
          <ImgShow
            imgName="题目解析"
            uploadFile={getImgPropsFc}
            isClear={isClear}
            problemImg={problemImg}
            setProblemImg={setProblemImg}
            changeClear={() => {
              setIsClear(false)
            }}
          ></ImgShow>
          <ImgShow
            imgName="题目答案"
            uploadFile={getImgPropsFc}
            isClear={isClear}
            problemImg={problemImg}
            setProblemImg={setProblemImg}
            changeClear={() => {
              setIsClear(false)
            }}
          ></ImgShow>
        </div>
      </Modal>
      <div className={classes['search-operate-wrapper']}>
        <Button type="primary" onClick={showModal}>
          新增
        </Button>
        <div className={classes['search-operate-middle']}>
          {searchItem.map((item, index) => {
            return (
              <div className={classes['middle-item']} key={index}>
                <div className={classes['middle-item-title']}>{item.name}</div>
                <div className={classes['.middle-item-comp']}>{item.comp}</div>
              </div>
            )
          })}
        </div>
        <Button type="primary">搜索</Button>
      </div>
    </>
  )
}

export default SearchOperate
