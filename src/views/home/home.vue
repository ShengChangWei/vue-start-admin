<template>
  <div :class="classObj"
       class="app-wrapper">
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar></nav-bar>
        <tags-view v-if="noTagsView"></tags-view>
      </div>
      <div class="app-main-container"
           :class="{'active': !noTagsView}">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from './components/side-bar/side-bar.vue';
import navBar from './components/nav-bar/nav-bar.vue';
import appMain from './components/app-main/app-main.vue';
import tagsView from './components/tags-view/tags-view.vue';
export default {
  name: 'home',
  components: {
    sideBar,
    navBar,
    appMain,
    tagsView
  },
  data() {
    return {
      noTagsView: true
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar,
        openSidebar: this.sidebar,
        withoutAnimation: false
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }
  .main-container {
    overflow: hidden;
    .app-main-container {
      margin-top: 100px;
      height: calc(100% - 100px);
      &.active {
        margin-top: 50px;
        height: calc(100% - 50px);
      }
    }
  }
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
</style>
