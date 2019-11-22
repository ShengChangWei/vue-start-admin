<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane"
                 class="tags-view-wrapper">
      <router-link v-for="tag in visitedViews"
                   ref="tag"
                   :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                   :key="tag.path"
                   tag="span"
                   :class="isActive(tag)?'active':''"
                   class="tags-view-item"
                   @click.middle.native="closeSelectedTag(tag)"
                   @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title}}
        <span class="el-icon-close"
              :class="isActive(tag)?'active':''"
              @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
      <e-vue-contextmenu ref="ctxshow"
                         id="contextmenu">
        <!-- <div @click="refreshSelectedTag(selectedTag)">刷新</div> -->
        <div @click="closeSelectedTag(selectedTag)">关闭</div>
        <div @click="closeOthersTags">关闭其他</div>
        <div @click="closeAllTags">关闭所有</div>
      </e-vue-contextmenu>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane';
// import { generateTitle } from '@/utils/i18n'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    };
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.visitedViews;
    }
  },
  created() {
    this.addViewTags();
    console.log(this.$store.state.visitedViews);
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    addViewTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch('addView', this.$route);
      }
      return false;
    },
    openMenu(tag, e) {
      this.$refs.ctxshow.showMenu();
      this.selectedTag = tag;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route);
            }
            break;
          }
        }
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView);
          } else {
            this.$router.push('/');
          }
        }
      });
      this.$refs.ctxshow.hideMenu(); // 隐藏菜单
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        console.log(11);
        const { fullPath } = view;
        console.log(fullPath);
        this.$nextTick(() => {
          this.$router.replace({
            path: fullPath
          });
          this.$refs.ctxshow.hideMenu(); // 隐藏菜单
        });
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
      this.$refs.ctxshow.hideMenu(); // 隐藏菜单
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews');
      this.$router.push('/');
      this.$refs.ctxshow.hideMenu(); // 隐藏菜单
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/variables.scss';
.tags-view-container {
  height: 50px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #2c7ff6;
  border-top: 1px solid #2c7ff6;
  /deep/ {
    .scroll-container {
      height: 100%;
    }
  }
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      line-height: 50px;
      height: 50px;
      padding: 0 10px;
      border-right: 1px solid rgba(217, 223, 233, 1);
      color: #495060;
      background: #fff;
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: $primary;
        color: #fff;
        border-color: $primary;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }

    // .tags-view-item {
    //   display: inline-block;
    //   position: relative;
    //   cursor: pointer;
    //   line-height: 50px;
    //   height: 50px;
    //   padding: 0 6px;
    //   border-right: 1px solid rgba(217, 223, 233, 1);
    // }
  }
  #contextmenu {
    margin: 0;
    background: #fff;
    // z-index: 100;
    // position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    min-width: 90px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    div {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
@import '~@/styles/variables.scss';
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 11px;
      vertical-align: 3px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
      &.active {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
