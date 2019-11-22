<template>
  <div style="padding: 0 15px;"
       @click="toggleClick">
    <i class="fa fa-bars hamburger"
       :class="{'is-active':!isActive}"></i>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick');
    }
  }
};
</script>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  &.is-active {
    transform: rotate(90deg);
  }
}
</style>
