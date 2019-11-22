<template>
  <el-container>
    <el-aside width="25%">
      <div class="aside-title title">
        角色管理
        <div class="title-btn pull-right">
          <el-button type="primary"
                     icon="el-icon-circle-plus-outline"
                     round
                     @click="addRole()">添加</el-button>
        </div>
      </div>
      <div class="aside-content">
        <el-scrollbar style="height: 100%;">
          <a v-for="(role,index) in roles"
             :key="index"
             class="list-group-item"
             :class="{active: selectedRole && selectedRole.id === role.id}"
             @mouseenter="listMouseOn(role.id)"
             @mouseleave="listMouseLeave()"
             @click="selectRole(role)">
            <i class="fa fa-user-circle-o list-icon"></i>
            <div class="list-group-item-heading"
                 style="display: inline-block">
              <h4>
                {{role.rolenm}}
              </h4>
              <p class="list-group-item-text">{{role.info}}</p>
            </div>
            <div v-if="hoverButtonId === role.id"
                 class="btn-group btn-group-xs">
              <el-button type="warning"
                         size="mini"
                         round
                         @click="editRole(role)">编辑</el-button>
              <el-button type="danger"
                         size="mini"
                         round
                         @click="deleteRole(role)">删除</el-button>
            </div>
          </a>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main>
      <div class="main-title title">
        【{{selectedRole.rolenm}}】资源
        <div class="title-btn">
          <el-button v-if="isChecked"
                     type="primary"
                     size="small"
                     round
                     @click="updateRoleresource">保存</el-button>
        </div>
      </div>
      <div class="main-content">
        <el-scrollbar style="height: 100%;">
          <el-tree v-if="IsTree"
                   :data="roleResource"
                   show-checkbox
                   default-expand-all
                   node-key="id"
                   :default-checked-keys="selectedRoleResource"
                   highlight-current
                   :props="defaultProps"
                   @check="checkResource">
            <span slot-scope="{ node, data }"
                  class="custom-tree-node">
              <i class="icon"
                 :class="data.icon"></i>
              <span class="label">{{ node.label }}</span>
              <span v-if="node.childNodes.length>0"
                    class="floatRight number">{{ node.childNodes.length }}</span>
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
    </el-main>

    <!-- 弹出层信息 -->
    <el-dialog :title="modalTitle"
               :visible.sync="roleFormDisplay"
               width="30%">
      <el-form ref="dialogForm"
               :label-position="labelPosition"
               label-width="80px"
               :model="newRole">
        <el-form-item label="角色名称"
                      prop="rolenm"
                      :rules="[{ required: true, message: '角色名称不能为空', trigger: 'blur' }]">
          <el-input v-model="newRole.rolenm"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="info">
          <el-input v-model="newRole.info"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="roleFormDisplay = false">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   :disabled="newRole.invalid"
                   @click="formConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import sysRoleService from '@/api/sys-role.js';
export default {
  name: 'role',
  data() {
    return {
      roles: [],
      selectedRole: {},
      newRole: {
        rolenm: '新角色',
        info: '这是新角色'
      },
      roleResource: [],
      selectedRoleResource: [],
      hoverButtonId: '',
      items: [],
      roleFormDisplay: false,
      isChecked: false, // 是否点击节点
      modalTitle: '添加角色',
      updateBtnText: '保存',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      IsTree: true,
      labelPosition: 'top'
    };
  },
  created: function() {
    this.getRoles();
    this.getResourceTree();
  },
  mounted() {},
  methods: {
    /**
     * 获取资源树
     */
    getResourceTree() {
      this.roleResource = [];
      sysRoleService.getResourceTree().then(res => {
        if (res.code === 'ok') {
          this.roleResource.push(res.result);
        }
      });
    },
    /**
     * 获取所有角色
     */
    getRoles() {
      sysRoleService.getRoles().then(res => {
        if (res.code === 'ok') {
          this.roles = res.result;
          this.selectRole(this.roles[0]);
        }
      });
    },
    /**
     * 添加角色
     */
    addRole() {
      this.modalTitle = '添加角色';
      this.newRole = {
        rolenm: '新角色',
        info: '这是新角色'
      };
      this.roleFormDisplay = true;
    },

    /**
     * 编辑角色
     * @param role
     */
    editRole(role) {
      this.modalTitle = '编辑角色';
      const copyRole = JSON.parse(JSON.stringify(role));
      this.newRole = copyRole;
      this.roleFormDisplay = true;
    },
    /**
     * 确定按钮点击事件
     */
    formConfirm() {
      if (this.newRole.id) {
        sysRoleService.updateRole(this.newRole).then(serverData => {
          this.roleFormDisplay = false;
          if (serverData.code === 'ok') {
            this.getRoles();
            this.$message({
              message: '编辑成功！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '编辑失败！',
              type: 'error'
            });
          }
        });
      } else {
        sysRoleService.addRole(this.newRole).then(serverData => {
          this.roleFormDisplay = false;
          if (serverData.code === 'ok') {
            this.getRoles();
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '添加失败！',
              type: 'error'
            });
          }
        });
      }
    },
    /**
     * 删除角色
     * @param role
     */
    deleteRole(role) {
      this.$confirm(`确定删除 【${role.rolenm}】角色吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          sysRoleService.deleteRole(role.id).then(serverData => {
            if (serverData.code === 'ok') {
              this.getRoles();
              this.selectedRole = null;
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除失败！'
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      return false;
    },

    /**
     * 选中角色
     * @param role
     */
    selectRole(role) {
      this.isChecked = false;
      this.IsTree = false;
      sysRoleService.getRoleresource(role.id).then(serverData => {
        if (serverData.code === 'ok') {
          this.selectedRoleResource = [];
          if (serverData.result.resources.length > 0) {
            const roleresources = serverData.result.resources;
            roleresources.forEach(data => {
              this.selectedRoleResource.push(data.id);
            });
          }
          this.IsTree = true;
          this.selectedRole = JSON.parse(JSON.stringify(role));
        }
      });
    },
    checkResource($event, data) {
      this.items = data.checkedKeys;
      this.isChecked = true;
    },
    /**
     * 修改角色资源
     */
    updateRoleresource() {
      this.updateBtnText = '保存中...';
      const obj = {
        id: this.selectedRole.id,
        items: this.items
      };
      sysRoleService.addRoleresource(obj).then(serverData => {
        this.updateBtnText = '保存';
        if (serverData.code === 'ok') {
          this.isChecked = false;
          this.$message({
            type: 'success',
            message: '保存成功！'
          });
          this.events.publish('resourceNodeMove'); // 发送资源节点移动的事件
        } else {
          this.$message({
            type: 'error',
            message: '保存失败！'
          });
        }
      });
    },
    /**
     * ngFor追踪函数
     * @param role
     * @returns {string}
     */
    trackByRoles(role) {
      return role.id;
    },

    /**
     * 列表移上事件
     * @param cid
     */
    listMouseOn(cid) {
      this.hoverButtonId = cid;
    },

    /**
     * 列表移出事件
     */
    listMouseLeave() {
      this.hoverButtonId = '';
    },

    /**
     * 取消按钮点击事件
     */
    cancle() {
      this.roleFormDisplay = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .title {
    height: 86px;
    line-height: 86px;
    font-size: 24px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #e2ebed;
    .title-btn {
      margin-left: 150px;
      display: inline-block;
    }
  }
  .el-aside {
    border-right: 1px solid #e2ebed;
    height: 100%;
    .aside-content {
      height: calc(100% - 87px);
      padding: 20px;
      .list-group-item {
        display: block;
        position: relative;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #a5caec;
        background: #fff;
        i {
          font-size: 60px;
          width: 100px;
          text-align: center;
          color: #a5caec;
        }
        p {
          color: #a4a4a4;
        }
        .btn-group {
          position: absolute;
          top: 20px;
          right: 30px;
        }
        &.active {
          background-color: #f4f8fb;
          border-color: #e2ebed;

          h4 {
            color: #2eb5f0;
          }

          p {
            color: #2eb5f0;
          }
        }
      }
    }
  }
  .el-main {
    padding: 0;
    .main-title {
      width: 100%;
      .title-btn {
        margin-left: 200px;
        display: inline-block;
      }
    }
    .main-content {
      width: 40%;
      margin-top: 40px;
      margin-left: 20px;
      height: calc(100% - 150px);
      .custom-tree-node {
        width: 100%;
        padding-top: 2px;
        font-size: 14px;
        .icon {
          margin-right: 5px;
        }
        .number {
          display: inline-block;
          padding: 0px 6px;
          border: 1px solid #e2ebed;
          border-radius: 50%;
          &.active {
            background-color: #2eb5f0;
            color: #fff;
          }
        }
        .label {
          &.active {
            background-color: #2eb5f0;
            color: #fff;
            padding: 2px 3px;
            border-radius: 3px;
          }
        }
        &:hover {
          .label {
            background-color: #2eb5f0;
            color: #fff;
            padding: 2px 3px;
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.el-tree-node__label {
  padding: 3px 5px;
  &:hover {
    background-color: #2eb5f0;
    border-radius: 2px;
    color: #fff;
  }
}
.el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
  .custom-tree-node {
    .label {
      background-color: #2eb5f0;
      color: #fff;
      padding: 2px 3px;
      border-radius: 3px;
    }
    .number {
      background-color: #2eb5f0;
      color: #fff;
    }
  }
}
#contextStyle {
  padding: 7px;
  > div {
    padding: 4px 2px;
    cursor: pointer;
    > i {
      margin-right: 6px;
    }
    &:hover {
      background-color: #2eb5f0;
      color: #fff;
      border-radius: 3px;
    }
  }
}
.el-form-item {
  margin-bottom: 20px;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.el-input.is-disabled .el-input__inner {
  color: #7c7979;
}
</style>

