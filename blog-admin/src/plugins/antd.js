import Vue from 'vue'
import {
  message,
  Modal,
  Input,
  Button,
  Icon,
  Tabs,
  Menu,
  Table,
  Select,
  Tooltip,
  Pagination,
  Upload,
  Dropdown,
  Tag,
  Badge,
  ConfigProvider,
  Avatar,
  Comment
} from 'ant-design-vue'

Vue.use(Modal)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Input.TextArea.name, Input.TextArea)
Vue.component(Icon.name, Icon)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Menu.Divider.name, Menu.Divider)
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
Vue.component(Tabs.name, Tabs)
Vue.component(Tabs.TabPane.name, Tabs.TabPane)
Vue.component(Table.name, Table)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Select.OptGroup.name, Select.OptGroup)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Modal.name, Modal)
Vue.component(Pagination.name, Pagination)
Vue.component(Upload.name, Upload)
Vue.component(Upload.Dragger.name, Upload.Dragger)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Tag.name, Tag)
Vue.component(Badge.name, Badge)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(Avatar.name, Avatar)
Vue.component(Comment.name, Comment)

Vue.prototype.$message = message
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
