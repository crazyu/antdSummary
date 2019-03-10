import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Row,
  Col,
  InputNumber,
  Table,
  Radio,
  Icon,
  Tooltip,
  Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormRechargeAdd from './FormRechargeAdd';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {

  state={
    isRequired:false,
    selectedRow:{},
    current:1,
    pageSize:10,
    visible:false,
  };

  componentDidMount() {
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log("values",values);
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  /**
   * 重置
   */
  reset= () =>{
    const {form:{resetFields}} =this.props;
    resetFields();
  };

  /**
   * 动态校验
   */
  setIsRequired= () =>{
    const {form:{validateFields,resetFields,setFieldsValue}} =this.props;
    this.setState({
      isRequired:true,
    },()=>{
      validateFields(['company2'], { force: true });
      }
    );
    //  clearValue
    resetFields(["clearValue"]);// 重置值
    setFieldsValue(["clearValue"]);  // 设置一个表单值
  };


  /**
   * @Author luzhijian
   * @Description //点击分页 页码
   * @Date 11:13 2018/11/29
   * @Param mod
   * @return
   * */
  handleTableChange = (current, pageSize) => {
    this.setState({
      current,
      pageSize,
    },()=>{
      // this.searchRoleList(current,pageSize);  //  此处走查询的方法
    });
  };


  show = ()=>{
    const params = this.FormRechargeAdd.handleSubmit();
    if(params){
      console.log("params",params);
    }

  };

  showModal = () =>{
    this.setState({
      visible:true,
    })
  };

  cancle = () =>{
    this.setState({
      visible:false,
    })
  };

  search =( current=1,pageSize=10) =>{
    const {dispatch} =this.props;
    const param={}; // 查询条件
    dispatch({
      type:'form/setSearchInfo',  //  保存查询条件 方法
      payload:{
        ...param,  // pageNum ,pageSize 必传
      }
    });

    dispatch({
      type:'',  //  查询方法
    })
  };

 // 详情页面的返回方法
  goBack = () => {
    const {dispatch} =this.props;
    dispatch({
      type:'form/setIsReturn',  //  保存查询条件 方法
      payload:{
        flag:true,  // pageNum ,pageSize 必传
      }
    });
     // router.goBack(); //
  };

  init = () => {
    // const {dispatch, reduction: {isReturn, searchInfo}} = this.props;
    // if (isReturn && isReturn.flag) {  // true 定义为页面是返回按钮进入的
    //   console.log("Enter");
    //   this.getList();
    //   if (searchInfo && searchInfo.derateItemId) {
    //     this.getReduceType(searchInfo.derateItemId);
    //   }
    //   if (searchInfo && searchInfo.pageSize && searchInfo.pageNum) {
    //     this.setState({
    //       current: searchInfo.pageNum,
    //       pageSize: searchInfo.pageSize
    //     })
    //   }
    // } else {
    //   console.log("----");
    //   // this.checkFormAndSubmit(1,10);
    //   dispatch({
    //     type: this.action.queryList,
    //     payload: {
    //       pageNum: 1,
    //       pageSize: 10
    //     },
    //   });
    // }
    // ;
  }


  /**
   * @Author luzhijian
   * @Description // 分页切换的时候 显示对应页的数据
   * @Date
   * @Param
   * @return
   * */
  searchRoleList = (currentPage,pageSize) => {
    const { dispatch } = this.props;
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      const param = {
        // operatingTimeString:values.operatingTime!==null&&values.operatingTime!==undefined?values.operatingTime.format("YYYY-MM-DD"):null,
        // companyName:values.companyName!==undefined?values.companyName.trim():null,
        // serviceTypeId:values.serviceTypeId==="0"?null:values.serviceTypeId,
        // serviceId:(values.serviceId!==undefined)?(values.serviceId==="0"?null:values.serviceId):null,
        // organizerTypeId:values.organizerTypeId==="0"?null:values.organizerTypeId,
        // organizerTaxpayerName:values.organizerTaxpayerName!==undefined?values.organizerTaxpayerName.trim():null,
        // messageType:values.messageType==="0"?null:values.messageType,
        // processStatus:(values.processStatus!==undefined && values.processStatus==="0")?null:values.processStatus,
        // organizerTenantName:values.organizerTenantName!==undefined?values.organizerTenantName.trim():null,
        pageNum:currentPage,
        pageSize,
        requesterType:1,
      };
      // dispatch({
      //   type: this.action.setInfo,
      //   payload: {
      //     ...param,
      //   },
      // });
      // dispatch({
      //   type: this.action.queryList,
      //   payload: {
      //     ...param
      //   },
      // });
    });
  };




  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const {isRequired,selectedRow,current,pageSize,visible} =this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 16 },
      },
    };

    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '3',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '5',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '6',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '7',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '8',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '9',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '10',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },{
      key: '11',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width:'200',  // 设置宽度防止样式变形
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width:'200', // 设置宽度防止样式变形
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width:'200',  // 设置宽度防止样式变形
    }];

    const str="IsReturn :{flag:true}";


    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <h1>表单基本检验</h1>
          <hr />
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.label" />}>
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required: true,
                        message: "请输入",
                      },
                    ],
                  })(
                    <Input
                      autoFocus
                      whitespace='true'
                      allowClear
                      max={50}  //
                      min={1}
                      style={{width:'100%'}}
                      placeholder={formatMessage({ id: 'form.title.placeholder' })}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="公司">
                  {getFieldDecorator('company', {
                    rules: [
                      {
                        required: true,
                        message: "请输入",
                      },
                    ],
                  })(
                    <Input
                      autoFocus
                      whitespace='true'
                      allowClear
                      max={50}  //
                      min={1}
                      style={{width:'100%'}}
                      placeholder={formatMessage({ id: 'form.title.placeholder' })}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="金额">
                  {getFieldDecorator('money', {
                    rules: [
                      {
                        required: true,
                        message: "请输入",
                      },
                    ],
                  })(
                    <InputNumber
                      autoFocus
                      whitespace='true'
                      allowClear
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      step={1}
                      max={5000}  //
                      min={1}
                      style={{width:'100%'}}
                      placeholder={formatMessage({ id: 'form.title.placeholder' })}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="选择框">
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required: true,
                        message: "请输入",
                      },
                    ],
                  })(
                    <Select
                      allowClear
                    >
                      <Select.Option key='1' value='1'></Select.Option>
                      <Select.Option key='2' value='2'></Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
              <Button type="primary" htmlType='submit' loading={submitting}>提交</Button>
              <Button type="primary" onClick={this.reset}>重置表单</Button>
            </div>
            <h1>动态检验</h1>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.label" />}>
                  {getFieldDecorator('selectValidate', {
                    rules: [
                      {
                        required: true,
                        message: "请选择",
                      },
                    ],
                  })(
                    <Select
                      allowClear
                      onChange={this.setIsRequired}
                    >
                      <Select.Option key='1' value='1'></Select.Option>
                      <Select.Option key='2' value='2'></Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="动态是否必选">
                  {getFieldDecorator('company2', {
                    rules: [
                      {
                        required: isRequired,
                        message: "请输入",
                      },
                    ],
                  })(
                    <Input
                      whitespace='true'
                      allowClear
                      max={50}  //
                      min={1}
                      style={{width:'100%'}}
                      placeholder={formatMessage({ id: 'form.title.placeholder' })}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="请空值">
                  {getFieldDecorator('clearValue', {
                    rules: [
                      {
                        required: true,
                        message: "请选择",
                      },
                    ],
                  })(
                    <Input
                      whitespace='true'
                      allowClear
                      max={50}  //
                      min={1}
                      style={{width:'100%'}}
                      placeholder={formatMessage({ id: 'form.title.placeholder' })}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <hr />
          </Form>
          <em>.indexOf （）是字符串才有的方法  </em>
        </Card>
        <Card>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record.key}
            rowClassName={record => {
              if (selectedRow != null && selectedRow.key === record.key) {
                return `${styles.selectedColor}`;
              } else {
                return '';
              }
            }}
            onRow={record => {
              return {
                onClick: () => {
                  if (selectedRow != null && selectedRow.key === record.key) {
                    this.setState({
                      selectedRow: {},
                    });
                  } else {
                    this.setState({
                      selectedRow: record,
                    });
                  }
                },
              };
            }}
            pagination={{
              current,
              pageSize,
              defaultCurrent: current,
              defaultPageSize: pageSize,
              total: dataSource  && dataSource.length? dataSource.length:'',
              showSizeChanger: true,
              onShowSizeChange: this.handleTableChange,
              onChange: this.handleTableChange,
            }}
          />
          <h1> modal提交</h1>
          <hr />
          <Button onClick={this.showModal} type="primary">modal</Button>

          <Modal
            title={<FormattedMessage id="app.boughtPackage.packageManagement" defaultMessage="套餐管理" />} //
            visible={visible}
            onOk={this.show}
            onCancel={this.cancle}
            destroyOnClose   // 关闭modal 销毁
          >
            <FormRechargeAdd
              wrappedComponentRef={inst => {
                this.FormRechargeAdd = inst;
              }}
            />
          </Modal>

          <hr />
          <h1>保存查询条件</h1>
          <p>需求：由一览页面进入详情页面返回的时候保存原来查询状态</p>
          <ul>
            <li> 步骤如下:</li>
            <li> 1.查询 方法保存 查询条件</li>
            <li> 2.详情页面返回按钮  设置{str},标识是页面返回的 </li>
            <li> 3.页面初始化判断是否isReturn 中的flag值为true或者false,true的时候，使用 searchInfo保存的数据最为查询状态，同同时resetFileds() 重置form查询条件，否则，只传 必传参数</li>
          </ul>
          <Button onClick={this.search}> 查询 </Button>
          <Button onClick={this.goBack}> 返回 </Button>
          <Button onClick={this.init}> 页面初始化方法即 componentDidMount方法 </Button>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
