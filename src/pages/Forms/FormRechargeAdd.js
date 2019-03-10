import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Input, Select } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';

const FormItem = Form.Item;

@connect(({ enterpriseInfoManagement, loading }) => ({
  enterpriseInfoManagement,
  loading: loading.models.enterpriseInfoManagement,
}))
@Form.create()
export default class FormRechargeAdd extends Component {

  action={
    queryServiceInfo:"enterpriseInfoManagement/fetchServiceList", // 查询套餐信息
  }

  state={
    index:0, // 默认选中index===0
    index2:0, //
    price:"", // 价格
    chargeWay:"", // 收费方式
  }

  componentDidMount() {
  }

  /**
   * @Author changjiaocheng
   * @Description // 获取页面上所需要的list
   * @Date 11:26 2018/12/14
   * @Param mod
   * @return
   **/
  getList=()=>{
    const {dispatch}=this.props;
    dispatch({
      type: this.action.queryServiceInfo,
    });

  };

  handleSubmit = () => {
    const { form } = this.props;
    // const {index,index2,result}=this.state;
    // let params = null;
    form.validateFieldsAndScroll((err, values) => {
      if(err) return ;
    //     console.log(serviceList);
    //     console.log(index);
    //     console.log(index2);
    //     console.log(serviceList[index].wgsOwnerServiceListDtos[index2]);
    //
    //     params = {
    //       ...values,
    //       serviceId:serviceList[index].wgsOwnerServiceListDtos[index2].serviceId.toString(),
    //       unitPrice:serviceList[index].wgsOwnerServiceListDtos[index2].priceForTenantString.toString(),
    //       chargeType:serviceList[index].wgsOwnerServiceListDtos[index2].chargeType.toString(),
    //     };
    //   }
    });
    // return params;
  };

  changeItem=(value)=>{
    this.setState({
      index:value,
      index2:0,
    })

  };

  changePrice=(value)=>{
    this.setState({
      index2:value,
    })
  };

  render() {
    const { form } = this.props;
    const {index,index2,result}=this.state;
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


    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label={ <FormattedMessage id="app.enterpriseManagement.serviceItemManagement.serviceItemCategory" defaultMessage="服务项类别" />}>
            {form.getFieldDecorator('type', {
              // initialValue:serviceList!==undefined && JSON.stringify(serviceList)!=="{}"&& serviceList[index]!==undefined?serviceList[index].serviceTypeName:"",
              rules:[{
                required:true,
              }],
            })(
              <Select
                onChange={value=>this.changeItem(value)}
                allowClear
              >
                <Select.Option key="1" value="1"></Select.Option>
                <Select.Option key="2" value="2"></Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={<FormattedMessage id="app.enterpriseManagement.serviceItemManagement.serviceItems" defaultMessage="服务项目" />}>
            {form.getFieldDecorator('serviceItems', {
              // initialValue:serviceList!==undefined && JSON.stringify(serviceList)!=="{}"&& serviceList[index]!==undefined?serviceList[index].wgsOwnerServiceListDtos[index2].serviceName:"",
              rules:[{
                required:true,
              }],
            })(
              <Select
                onChange={value=>this.changePrice(value)}
                allowClear
              >
                <Select.Option key="1" value="1"></Select.Option>
                <Select.Option key="2" value="2"></Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={<FormattedMessage id="app.enterpriseManagement.serviceItemManagement.payMethod" defaultMessage="收费方式" />}>
            {form.getFieldDecorator('payMethod', {
              // initialValue:serviceList!==undefined && JSON.stringify(serviceList)!=="{}"&& serviceList[index]!==undefined?serviceList[index].wgsOwnerServiceListDtos[index2].chargeTypeName:"",
            })(
              <Input disabled />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={<FormattedMessage id="app.enterpriseManagement.serviceItemManagement.price" defaultMessage="价格" />}>
            {form.getFieldDecorator('price', {
              // initialValue:serviceList!==undefined && JSON.stringify(serviceList)!=="{}"&& serviceList[index]!==undefined?serviceList[index].wgsOwnerServiceListDtos[index2].priceForTenantString:"",
            })(
              <Input disabled />
            )}
          </FormItem>
        </Form>
      </Card>
    );
  }
}
