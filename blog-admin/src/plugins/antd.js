import Vue from 'vue'
import {
  Alert,
  Layout,
  notification,
  message,
  Modal,
  Form,
  Input,
  Button,
  Icon,
  Tabs,
  Menu,
  Table,
  Breadcrumb,
  Select,
  Tooltip,
  Radio,
  Pagination,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Upload,
  DatePicker,
  TimePicker,
  Steps,
  Spin,
  Popover,
  Empty,
  Collapse
} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(Modal)
Vue.component(Alert.name, Alert)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Icon.name, Icon)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Menu.Divider.name, Menu.Divider)
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
Vue.component(Tabs.name, Tabs)
Vue.component(Tabs.TabPane.name, Tabs.TabPane)
Vue.component(Tabs.TabContent.name, Tabs.TabContent)
Vue.component(Table.name, Table)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Select.OptGroup.name, Select.OptGroup)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Modal.name, Modal)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Radio.name, Radio)
Vue.component(Radio.Group.name, Radio.Group)
Vue.component(Radio.Button.name, Radio.Button)
Vue.component(Pagination.name, Pagination)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Checkbox.Group.name, Checkbox.Group)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Upload.name, Upload)
Vue.component(Upload.Dragger.name, Upload.Dragger)
Vue.component(TimePicker.name, TimePicker)
Vue.component(DatePicker.name, DatePicker)
Vue.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker)
Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker)
Vue.component(DatePicker.WeekPicker.name, DatePicker.WeekPicker)
Vue.component(Steps.name, Steps)
Vue.component(Steps.Step.name, Steps.Step)
Vue.component(Spin.name, Spin)
Vue.component(Popover.name, Popover)
Vue.use(Empty)
Vue.use(Collapse)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
