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
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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

  render() {
    const test="7.props  多层解析带来的错误,eg:const {test:{dataList}} =this.props; 不可再dataList再次进行解构,以下是错误的,const {test:{dataList：{List}}} =this.props;";
    const test2="17.保存查询状态 1.首先在对应的model文件创建一个对象1.：searchInfo:{company:null}(查询条件的对象)2.查询的时候 调用保存的方法3.详情页返回:调用设置标志位方法flag:true，4在页面的初始化判断isReturn确定是否走条件查询";
    const test3="^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\\\d{8}$";
    const email="(\"^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\\\.)+[a-z]{2,}$\")";

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <ul>
            <li>1.如果需要清空models中state某一个的对象的时候，不需要的参数，请用 ...state 重新设置回去,避免在使用的时候拿不到值</li>
            <li>2.data.slice  is not a function  报错是  table 表格的数据源不是一个数组</li>
            <li>3.不同的文件的名字请勿重复,且class BasicForms extends PureComponent中的组件名称 BasicForm  首字母必须是要大写</li>
            <li>4.table 中的columns 列标注注释 列标题中文名（列数极多的时候，很难查找）</li>
            <li>5.多个PC端cookie 或者  token 参数名的不要重复</li>
            <li>6.table 表格  需要固定宽度，防止拉伸导致表格变形</li>
            <li>{test}</li>
            <li>8.@form.create 放置在  @connect 下面  放在上面有可能出现异常报错</li>
            <li>9.删除按钮加确认弹框</li>
            <li>10.能用form  提交的，用form  提交，尽量不要自己一点一点的检验</li>
            <li>11.二级table 样式错位，在二级菜单</li>
            <li>12.注意不要使用错误的Api eg:indexOf()是字符串才有的方法</li>
            <li>13.页面的查询按钮以及保存按钮，使用loading</li>
            <li>14.接口获取 table数据源的时候,在页面上使用一个变量接收，查询的时候,清空dateSource中的值，不这样做。会有数据返回的是对的，但是显示的数据有问题</li>
            <li>15.form表单提交</li>
            <li>16.当前手 机号校验正则:{test3},邮箱:{email}</li>
            <li>{test2}</li>
            <li>18.左侧菜单栏的样式，颜色修改：src/components/siderMenu 下面的less 文件， 全局的样式可在  src/global.less 增加样式</li>
            <li>19.当页面有table时候,  modal / 分页 重新调用查询方法需要带上查询条件</li>
            <li>20.table上 有 单挑数据选择的情况或者是有多选框的时候,完成对应的操作,需要重置 selectedrow：{} 为空的状态</li>
            <li>21.对于table 中或者显示的文字过长，  使用Tooltip 包裹，并且 超长字符用省略号显示</li>
          </ul>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
