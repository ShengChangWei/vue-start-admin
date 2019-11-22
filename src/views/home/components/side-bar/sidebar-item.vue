<template>
  <div class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <el-menu-item :index="onlyOneChild.url">
        <i :class="onlyOneChild.icon"></i>
        <span slot="title">{{ onlyOneChild.resourceName }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else
                :index="item.url">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.resourceName }}</span>
      </template>
      <sidebar-item v-for="child in item.children"
                    :key="child.id"
                    :item="child" />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'sidebar-item',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    },

  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  created() {},
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        this.onlyOneChild = item;
        return true;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  // height: 100%;
}
</style>

