<template>
  <div :class="classObj"
       class="app-wrapper">
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar></nav-bar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import sideBar from './components/side-bar/side-bar.vue';
import navBar from './components/nav-bar/nav-bar.vue';
import appMain from './components/app-main/app-main.vue';
export default {
  name: 'home',
  components: {
    sideBar,
    navBar,
    appMain
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
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
