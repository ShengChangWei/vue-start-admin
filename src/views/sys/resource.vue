<template>
  <el-container>
    <el-aside width="25%">
      <div class="aside-title title">
        系统资源
      </div>
      <div class="aside-content">
        <el-scrollbar style="height: 100%;">
          <el-tree :data="treeData"
                   node-key="id"
                   :current-node-key="resourceForm.id"
                   default-expand-all
                   draggable
                   @node-drop="handleDrop"
                   @node-drag-end="handleDragEnd"
                   @node-contextmenu="showContextmenu"
                   @node-click="treeClick">
            <span slot-scope="{ node, data }"
                  class="custom-tree-node">
              <i class="icon"
                 :class="data.icon"></i>
              <span class="label"
                    :class="{'active': data.id===resourceForm.id}">{{ node.label }}</span>
              <span v-if="node.childNodes.length>0"
                    class="floatRight number"
                    :class="{'active': data.id===resourceForm.id}">{{ node.childNodes.length }}</span>
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main>
      <div class="main-title title">【{{ resourceForm.name }}】详情</div>
      <div class="main-content">
        <el-form :model="resourceForm"
                 status-icon
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="资源类型："
                        prop="type">
            <el-input type="text"
                      :value="resourceForm.type === 'element' ? '元素' : resourceForm.type === 'url' ? '路径' : '菜单'"
                      disabled
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="资源编号："
                        prop="sn">
            <el-input type="text"
                      :value="resourceForm.sn"
                      autocomplete="off"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="资源名称："
                        prop="name">
            <el-input type="text"
                      :value="resourceForm.name"
                      autocomplete="off"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="资源图标："
                        prop="icon">
            <el-input type="text"
                      :value="resourceForm.icon"
                      autocomplete="off"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="资源路由："
                        prop="url">
            <el-input type="text"
                      :value="resourceForm.url"
                      autocomplete="off"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="资源备注："
                        prop="describe">
            <el-input type="textarea"
                      :value="resourceForm.describe"
                      autocomplete="off"
                      disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-main>

    <!-- 鼠标右键事件 -->
    <e-vue-contextmenu id="contextStyle"
                       ref="ctxshow">
      <div @click="add">
        <i class="fa fa-plus"></i>
        <span>添加</span>
      </div>
      <div @click="edit">
        <i class="fa fa-edit"></i>
        <span>编辑</span>
      </div>
      <div @click="deleteNav">
        <i class="fa fa-trash"></i>
        <span>删除</span>
      </div>
    </e-vue-contextmenu>

    <!-- 弹出层信息 -->
    <el-dialog title="添加/编辑资源"
               :visible.sync="dialogFormVisible"
               width="30%">
      <el-form ref="dialogForm"
               :label-position="labelPosition"
               label-width="80px"
               :model="dialogForm">
        <el-form-item label="资源类型"
                      prop="type"
                      :rules="[{ required: true, message: '资源类型不能为空', trigger: 'blur' }]">
          <el-select v-model="dialogForm.type"
                     style="width: 100%;">
            <el-option label="菜单"
                       value="menu"></el-option>
            <el-option label="路径"
                       value="url"></el-option>
            <el-option label="元素"
                       value="element"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源编号"
                      prop="sn"
                      :rules="[{ required: true, message: '资源编号不能为空', trigger: 'blur' }]">
          <el-input v-model="dialogForm.sn"></el-input>
        </el-form-item>
        <el-form-item label="资源名称"
                      prop="name"
                      :rules="[{ required: true, message: '资源名称不能为空', trigger: 'blur' }]">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资源图标"
                      prop="icon">
          <el-input v-model="dialogForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="资源路由"
                      prop="url">
          <el-input v-model="dialogForm.url"></el-input>
        </el-form-item>
        <el-form-item label="资源备注"
                      prop="describe">
          <el-input v-model="dialogForm.describe"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   :disabled="dialogForm.invalid"
                   @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import sysResourceService from '@/api/sys-resource';
export default {
  name: 'resource',
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      labelPosition: 'top',
      dialogForm: {
        type: 'menu',
        sn: '',
        name: '',
        icon: '',
        url: '',
        describe: ''
      },
      resourceForm: {},
      dialogFormVisible: false,
      parentId: '',
      resourceName: '',
      resourceTitle: '',
      curResource: {}
    };
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.$refs.dialogForm.resetFields();
      }
    }
  },
  created: function() {
    this.getResources();
  },
  mounted() {},
  methods: {
    add() {
      this.resourceTitle = '添加资源';
      this.dialogFormVisible = true;
      this.dialogForm = {
        type: 'menu',
        sn: '',
        name: '',
        icon: '',
        url: '',
        describe: ''
      };
    },
    edit() {
      this.resourceTitle = '编辑资源';
      this.dialogFormVisible = true;
      this.dialogForm = this.curResource;
    },
    treeClick(data) {
      this.resourceForm = data;
      console.log(data);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    getResources() {
      sysResourceService.getResources().then(res => {
        this.treeData[0] = res.result;
        if (this.treeData) {
          this.treeData = [...this.treeData];
          this.resourceForm = this.treeData[0];
        }
      });
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log(dropNode);
    },

    showContextmenu($event, data, node) {
      this.$refs.ctxshow.showMenu();
      this.parentId = data.id;
      this.resourceName = data.name;
      this.curResource = JSON.parse(JSON.stringify(data));
    },
    submitForm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let fn, params;
          if (this.resourceTitle === '添加资源') {
            this.dialogForm['parentId'] = this.parentId;
            params = this.dialogForm;
            fn = sysResourceService.addResource.bind(sysResourceService);
          } else {
            params = {
              ...this.dialogForm
            };
            fn = sysResourceService.updateResource.bind(sysResourceService);
          }
          fn(params).then(res => {
            this.dialogFormVisible = false;
            if (res.code === 'ok') {
              this.getResources();
              this.$message({
                message: res.info,
                type: 'success'
              });
            } else {
              this.$message({
                message: res.info,
                type: 'error'
              });
            }
          });
          //   sysResourceService.addResource(this.dialogForm).then(res => {});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deleteNav() {
      this.$confirm(`你确定删除【${this.resourceName}】资源吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysResourceService.deleteResource(this.parentId).then(res => {
          if (res.code === 'ok') {
            this.getResources();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      });
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
    border-bottom: 1px solid #e2ebed;
  }
  .el-aside {
    border-right: 1px solid #e2ebed;
    height: 100%;
    .aside-content {
      height: calc(100% - 87px);
      padding: 20px;
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
  .el-main {
    padding: 0;
    .main-content {
      width: 40%;
      margin-top: 40px;
      margin-left: 20px;
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
  margin-bottom: 10px;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.el-input.is-disabled .el-input__inner {
  color: #7c7979;
}
</style>
