import React from 'react'
import {
  Layout,
  Breadcrumb,
  Table,
  Space,
  Button,
  Modal,
  Form,
  DatePicker,
  TimePicker,
  Select,
  message,
} from 'antd'
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer'
import AuthenProvider from '../../services/authen_provider'
import { getUser, setUser } from '../../helper'
import ClassProvider from '../../services/class_provider'

import moment from 'moment'

const { Header, Content, Sider } = Layout
const { Option, OptGroup } = Select

const locations = [
  {
    groupLabel: 'อาคารเรียน 2',
    options: [
      'CB2301',
      'CB2304',
      'CB2305',
      'CB2306',
      'CB2308',
      'CB2312',
      'CB2313',
    ],
  },
  {
    groupLabel: 'อาคารเรียน SIT',
    options: [
      'Training 1/1',
      'Training 1/2',
      'Training 1/3',
      'Training 1/4',
      'Training 1/5',
      'Training 1/6',
      'Meeting 4/1',
      'Meeting 4/2',
    ],
  },
]

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

//const tailLayout = {
//  wrapperCol: { offset: 8, span: 16 },
//};

class ClassDetail extends React.Component {
  formRef = React.createRef()

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      data: {},
      subject: {
        course_code: this.props.match.params.id,
        course_name: '',
        section_name: '',
      },
      addattendance: {
        date: '',
        room_name: '',
        classtype: '',
        timestart: '',
        timeend: '',
        late1: '',
        late2: '',
        late3: '',
      },
      attendance: [],
      isLoading: false,
      collapsed: false,
      modalVisible: false,
    }
  }

  columns = [
    {
      title: 'ครั้งที่',
      dataIndex: 'no',
      key: 'runningnumber',
    },
    {
      title: 'เวลาเริ่มเรียน',
      key: 'timestart',
      dataIndex: 'timestart',
    },
    {
      title: 'เวลาเลิกเรียน',
      key: 'timeend',
      dataIndex: 'timeend',
    },
    {
      title: 'สถานที่',
      key: 'roomname',
      dataIndex: 'roomname',
    },
    {
      title: 'ดำเนินการ',
      render: (text, record) => (
        <Space size="middle">
          <p style={{cursor: "pointer"}} onClick={() => this.deleteAttendance('timestart', record)}>ลบ</p>
        </Space>
      ),
    },
  ]

  async componentDidMount() {
    this.setState({ isLoading: true })
    if (localStorage.getItem('token')) {
      try {
        const result = await AuthenProvider.fetchme()
        console.log(result.data)
        // const { user_type } = result.data
        const user = result.data
        // save data into local storage
        setUser(user)
        this.setState({ user: user })

        if (user.user_type !== 'inst_group') {
          this.props.history.push('/Unauthorized')
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.setState({ isLoading: false })
      }
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push('/Login')
    }
    this.getData()
  }

  async getData() {
    this.setState({ isLoading: true })
    try {
      const {data} = await ClassProvider.gettimeclass({
        section_name: this.props.match.params.section,
        course_code: this.props.match.params.id,
        semester: '1',
        academicyear: '2563',
      })
      console.log('getData', data)
      const attendance = Array.isArray(data) ? data.map((record, no) => ({no: no + 1, ...record})) : []
      this.setState({ attendance: attendance })
      console.log(this.state.data)
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  async addAttendance(payload) {
    try {
      const result = await ClassProvider.createchecklist(payload)
      this.setState({ data: result.data })
      console.log(this.state.data)
      message.success("บันทึกสำเร็จ")
      this.setState({modalVisible: false})
    } catch (e) {
      console.log(e)
      message.error("เกิดข้อผิดพลาด")
    } finally {
      this.setState({ isLoading: false })
      this.getData()
    }
  }

  async openDashboard(){

  }

  async deleteAttendance(payload){
    try {
      const result = await ClassProvider.deletechecklist({
          course_code: this.props.match.params.id,
          sectionname: "",
          timestart: payload

      })
      this.setState({ data: result.data })
      console.log(this.state.data)
      message.success("ลบห้องเรียนสำเร็จ")
      this.setState({modalVisible: false})
    } catch (e) {
      console.log(e)
      message.error("เกิดข้อผิดพลาด")
    } finally {
      this.setState({ isLoading: false })
      this.getData()
    }

  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  handleOk = (e) => {
    this.formRef.current.submit()
  }

  getDateTime = (momentBaseDate, momentTime) => {
    return momentTime
      ? moment(momentBaseDate)
          .hours(momentTime.hours())
          .minutes(momentTime.minutes())
          .seconds(momentTime.seconds())
          .utcOffset(7 * 60)
          .format('YYYY-MM-DD HH:mm:ss')
      : '' // return empty string when optional field is not fulfilled
  }

  onSubmit = async (fieldsValues) => {
    const date = fieldsValues.date.utcOffset(7 * 60) // set GMT+7
    const timestart = this.getDateTime(date, fieldsValues.timestart)
    const late1 = this.getDateTime(date, fieldsValues.late1)
    const late2 = this.getDateTime(date, fieldsValues.late2)
    const late3 = this.getDateTime(date, fieldsValues.late3)
    const timeend = this.getDateTime(date, fieldsValues.timeend)

    const payload = {
      semester: '1',
      academicyear: '2563',
      section_name: this.props.match.params.section,
      course_code: this.props.match.params.id,
      lecturer_user: getUser().user_id,
      room_name: fieldsValues.room,
      class_name: '',
      classtype: fieldsValues.type,
      timestart,
      timeend,
      late1,
      late2,
      late3,
    }
    await this.addAttendance(payload)
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      modalVisible: false,
    })
  }

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value })
  }

  render() {
    const { collapsed } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          theme="light"
        >
          <div className="logo" />
          <MenuBar />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <User user={this.state.user} />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <h1 style={{ fontSize: '28px', margin: '16px 0' }}>การเช็กชื่อ</h1>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
              <Breadcrumb.Item>{this.props.match.params.id}</Breadcrumb.Item>
              <Breadcrumb.Item>การเช็กชื่อ</Breadcrumb.Item>
            </Breadcrumb>
            <Button
              type="primary"
              size={'normal'}
              style={{ margin: '16px 0' }}
              onClick={this.showModal}
            >
              สร้างรายการเช็กชื่อ
            </Button>
            <Modal
              title="สร้างรายการเช็กชื่อ"
              visible={this.state.modalVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}> */}
              <Form
                {...layout}
                ref={this.formRef}
                name="createattendance"
                onFinish={this.onSubmit}
              >
                <Form.Item
                  label="วันที่"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: 'กรุณาระบุวันที่',
                      type: 'object',
                    },
                  ]}
                >
                  <DatePicker style={{ width: 250 }} />
                </Form.Item>
                <Form.Item
                  label="สถานที่"
                  name="room"
                  rules={[{ required: true, message: 'กรุณาเลือกสถานที่' }]}
                >
                  {/* <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}> */}
                  <Select style={{ width: 250 }}>
                    {locations.map((group) => {
                      return (
                        <OptGroup label={group.groupLabel}>
                          {group.options.map(option => (
                            <Option value={option}>{option}</Option>
                          ))}
                        </OptGroup>
                      )
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="ประเภทห้องเรียน"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: 'กรุณาเลือกประเภทห้องเรียน',
                      type: 'string',
                    },
                  ]}
                >
                  <Select style={{ width: 250 }}>
                    <Option value="Lecture">ทฤษฏี (Lecture)</Option>
                    <Option value="Lab">ปฏิบัติ (Lab)</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="เวลาเข้าเรียนตรง"
                  name="timestart"
                  rules={[
                    {
                      required: true,
                      message: 'กรุณาระบุเวลาเข้าเรียน',
                      type: 'object',
                    },
                  ]}
                >
                  <TimePicker style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="เวลามาสายครั้งที่ 1" name="late1">
                  <TimePicker style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="เวลามาสายครั้งที่ 2" name="late2">
                  <TimePicker style={{ width: 250 }} />
                </Form.Item>
                <Form.Item label="เวลามาสายครั้งที่ 3" name="late3">
                  <TimePicker style={{ width: 250 }} />
                </Form.Item>
                <Form.Item
                  label="เวลาเลิกเรียน"
                  name="timeend"
                  rules={[
                    {
                      required: true,
                      message: 'กรุณาระบุเวลาเข้าเรียน',
                      type: 'object',
                    },
                  ]}
                >
                  <TimePicker style={{ width: 250 }} />
                </Form.Item>
              </Form>
            </Modal>
            <div className="site-layout-background">
              <Table
                columns={this.columns}
                dataSource={this.state.attendance}
                style={{ width: '100%' }}
                bordered
              />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}

export default ClassDetail
