<template>
  <div class="menu">
    <!-- <a-button class="menu-collapse-btn" type="primary" @click="() => collapsed = !collapsed" style="margin-bottom: 16px">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <div class="menu-title-box">
      <img class="logo" src="../../assets/images/menu_logo.jpeg"/>
    </div>
    <a-menu
      style="background: none;"
      :defaultSelectedKeys="defaultSelectedKeys"
      :defaultOpenKeys="defaultOpenKeys"
      mode="inline"
      theme="light"
      :inlineCollapsed="collapsed"
    >
      <template v-for="route in routes">
        <template v-if="route.children && route.children.length">
          <a-sub-menu :key="route.name">
            <span slot="title"><a-icon :type="route.meta.icon" />{{route.meta.tabName || route.meta.title}}</span>
            <a-menu-item v-for="subRoute in route.children" :key="subRoute.name" @click="skipToRoute(route.name)">
              {{subRoute.meta.tabName || subRoute.meta.title}}
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="route.name" @click="skipToRoute(route.name)"><a-icon :type="route.meta.icon" />{{route.meta.tabName || route.meta.title}}</a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import routes from '@/router/combineRouter'
export default {
  name: 'sideBar',
  data () {
    return {
      collapsed: false,
      routes: [],
      defaultSelectedKeys: [],
      defaultOpenKeys: []
    }
  },
  created () {
    this.routes = this.getMenus(routes)
    this.getDefaultMenuKeys()
  },
  methods: {
    /**
     * @function 路由跳转
     * @param {String} name 跳转的目标路由名字
     */
    skipToRoute (name) {
      this.$route.name !== name && this.$router.push({ name })
    },
    /**
     * @function 计算默认展开和选中的菜单
     */
    getDefaultMenuKeys () {
      let routeNames = this.$route.path.split('/')
      this.defaultSelectedKeys = [...routeNames]
      this.defaultOpenKeys = [...routeNames]
    },
    /**
     * @function 计算
     * @param {Array} 路由数组
     */
    getMenus (routes) {
      let res = []
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].hidden) {
          if (routes[i].children) {
            res.push(...this.getMenus(routes[i].children))
          }
        } else {
          if (routes[i].children && routes[i].children.length) {
            routes[i].children = this.getMenus(routes[i].children)
          }
          res.push(routes[i])
        }
      }
      return res
    }
  }
}
</script>

<style lang="less" scoped>
@import './index';
</style>
