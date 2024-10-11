import React, { useEffect, useState } from 'react'
import { Modal, Input, Select } from 'antd'
import classes from './edit.module.less'
interface IMyProps {
  editData: any
  editModal: boolean
  editModelFc: (data: any) => void
  editDataFc: (data: any) => void
}
const Edit: React.FC<IMyProps> = (props: IMyProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newEditData, setNewEditData] = useState<any>({
    topicId: '',
    topicType: '',
    topicDiff: '',
    topicFrom: ''
  })
  useEffect(() => {
    setIsModalOpen(props.editModal)
  }, [props.editModal])
  const handleOk = async () => {
    // props.editData
    props.editModelFc(false)
    console.log('编辑的数据', newEditData)
    await props.editDataFc(newEditData)
    setIsModalOpen(false)
  }
  useEffect(() => {
    setNewEditData({
      topicId: props.editData.topicId,
      topicType: props.editData.topicType,
      topicDiff:
        props.editData.topicDiff === '简单'
          ? 1
          : props.editData.topicDiff === '中等'
          ? 2
          : 3,
      topicFrom: props.editData.topicFrom
    })
  }, [props.editModal])
  const handleCancel = () => {
    setIsModalOpen(false)
    props.editModelFc(false)
  }
  return (
    <div>
      <Modal
        title="编辑"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <div>编辑</div> */}
        {/* 数据显示 */}
        <div className={classes['edit-wrapper']}>
          <div className={classes['edit-item']}>
            <div className={classes['edit-title']}>题目ID: </div>
            {props.editData.topicId}
          </div>
          <div className={classes['edit-item']}>
            <div className={classes['edit-title']}>题目备注： </div>
            <Input
              className={classes['edit-input']}
              value={newEditData.topicType}
              onChange={(e) => {
                setNewEditData({
                  ...newEditData,
                  topicType: e.target.value
                })
              }}
            ></Input>
          </div>
          <div className={classes['edit-item']}>
            <div className={classes['edit-title']}>题目难度：</div>
            <Select
              // size=""
              style={{
                marginLeft: '10px'
              }}
              value={newEditData.topicDiff}
              options={[
                { value: 1, label: '简单' },
                { value: 2, label: '中等' },
                { value: 3, label: '困难' }
              ]}
              onChange={(value) => {
                setNewEditData({
                  ...newEditData,
                  topicDiff: Number(value)
                })
              }}
            ></Select>
          </div>
          <div className={classes['edit-item']}>
            <div className={classes['edit-title']}>题目来源：</div>
            {/* {props.editData.topicFrom} */}
            <Input
              className={classes['edit-input']}
              value={newEditData.topicFrom}
              onChange={(e) => {
                setNewEditData({
                  ...newEditData,
                  topicFrom: e.target.value
                })
              }}
            ></Input>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Edit
