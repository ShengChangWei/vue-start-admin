<template>
  <el-container>
    <el-aside width="25%">
      <div class="aside-title title">
        组织机构
      </div>
      <div class="aside-content">
        <el-scrollbar style="height: 100%;">
          <el-tree :data="treeData"
                   node-key="id"
                   default-expand-all
                   :current-node-key="curTreeNode.id"
                   draggable
                   @node-drop="handleDrop"
                   @node-drag-end="handleDragEnd"
                   @node-contextmenu="showContextmenu"
                   @node-click="treeClick">
            <span slot-scope="{ node, data }"
                  class="custom-tree-node">
              <i class="icon Eicons sys-zuzhijigou"></i>
              <span class="label"
                    :class="{'active': data.id===curTreeNode.id}">{{ node.label }}</span>
              <span v-if="node.childNodes.length>0"
                    :class="{'active': data.id===curTreeNode.id}"
                    class="floatRight number">{{ node.childNodes.length }}</span>
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main>
      <div class="main-title title">【{{ curTreeNode.name }}】用户</div>
      <div class="main-content">
        <el-table :data="userList"
                  header-align="center"
                  align="center"
                  border
                  style="width: 100%;height:690px;">
          <el-table-column type="index"
                           :index="serialNumber"
                           label="序号"
                           width="60">
          </el-table-column>
          <el-table-column prop="nm"
                           label="用户名"
                           width="180">
            <template slot-scope="scope">
              {{scope.row.nm ?scope.row.nm:'/'}}
            </template>
          </el-table-column>
          <el-table-column prop="realName"
                           label="真实姓名"
                           width="180">
            <template slot-scope="scope">
              {{scope.row.realName?scope.row.realName:'/'}}
            </template>
          </el-table-column>
          <el-table-column prop="tel"
                           label="电话">
            <template slot-scope="scope">
              {{scope.row.tel ?scope.row.tel:'/'}}
            </template>
          </el-table-column>
          <el-table-column prop="email"
                           label="邮箱"
                           width="250">
            <template slot-scope="scope">
              {{scope.row.email ?scope.row.email:'/'}}
            </template>
          </el-table-column>
          <el-table-column prop="job"
                           label="职务"
                           width="100">
            <template slot-scope="scope">
              {{scope.row.job ?scope.row.job:'/'}}
            </template>
          </el-table-column>
          <el-table-column label="性别"
                           width="80">
            <template slot-scope="scope">
              {{scope.row.sex === 0?'男': scope.row.sex === 1?'女':'/'}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="addEdit(JSON.parse(JSON.stringify(scope.row)),'编辑')">编辑</el-button>
              <el-button type="text"
                         size="small"
                         style="color:red"
                         @click="handleClick(scope.row)">删除</el-button>
              <el-button type="text"
                         size="small"
                         @click="addEdit(JSON.parse(JSON.stringify(scope.row)),'编辑')">修改密码</el-button>
              <el-button type="text"
                         size="small"
                         @click="addEdit(JSON.parse(JSON.stringify(scope.row)),'编辑')">授权</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-page">
          <el-pagination background
                         layout="prev, pager, next"
                         :page-count="pageCount"
                         @current-change="pageChange">
          </el-pagination>
        </div>
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
    <el-dialog :title="dialogTreeTitle"
               :visible.sync="treeFormVisible"
               width="30%">
      <el-form ref="treeForm"
               label-width="100px"
               :model="treeForm">
        <el-form-item label="单位名称"
                      prop="type"
                      :rules="[{ required: true, message: '资源类型不能为空', trigger: 'blur' }]">
          <el-input v-model="treeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人"
                      prop="sn">
          <el-input v-model="treeForm.principal"></el-input>
        </el-form-item>
        <el-form-item label="单位手机"
                      prop="name">
          <el-input v-model="treeForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="单位邮箱"
                      prop="icon">
          <el-input v-model="treeForm.email"></el-input>
        </el-form-item>
        <el-form-item label="单位地址"
                      prop="url">
          <el-input v-model="treeForm.address"></el-input>
        </el-form-item>
        <el-form-item label="所属行政区"
                      prop="url">
          <el-input v-model="treeForm.district"></el-input>
        </el-form-item>
        <el-form-item label="单位角色授权"
                      prop="describe">
          <el-checkbox-group v-model="selectRoles">
            <el-checkbox v-for="item in roles"
                         :key="item.value"
                         :label="item.value"
                         name="type">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="treeFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   size="small"
                   :disabled="treeForm.invalid"
                   @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import sysOrgService from '@/api/sys-org';
export default {
  name: 'org',
  data() {
    return {
      search: {
        currentPage: 1,
        pageSize: 10
      },
      treeData: [],
      pageCount: 0,
      dialogTreeTitle: '',
      treeFormVisible: false,
      curTreeNode: {},
      treeForm: {
        id: '',
        parentId: '',
        name: '',
        principal: '',
        tel: '',
        email: '',
        address: '',
        district: ''
      },
      roles: [],
      selectRoles: [],
      curOrg: {},
      userList: []
    };
  },
  created() {
    this.getSysUnitListTree();
  },
  methods: {
    /**
     * 表格序号
     */
    serialNumber(val) {
      return (this.search.currentPage - 1) * 10 + val + 1;
    },
    /**
     * 分页切换
     */
    pageChange(event) {
      this.search.currentPage = event;
      this.getUserListPage();
    },
    /**
     * 获取机构树
     */
    getSysUnitListTree() {
      sysOrgService.getSysUnitListTree().then(res => {
        this.treeData[0] = res;
        if (this.treeData) {
          this.treeData = [...this.treeData];
          this.treeForm = JSON.parse(JSON.stringify(this.treeData[0]));
          this.curTreeNode = this.treeData[0];
          this.getUserListPage();
        }
      });
    },
    /**
     * 树节点点击操作
     */
    treeClick(data) {
      this.treeForm = JSON.parse(JSON.stringify(data));
      this.curTreeNode = data;
      this.getUserListPage();
      console.log(data);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode, dropNode, dropType, ev);
      // const parentNodeData = dropNode.parent;
      // const currentNodeData = draggingNode;
      // if (parentNodeData) {
      //   let currentPosition = 0;
      //   if (event.dropIndex) {
      //     currentPosition = event.dropIndex;
      //   }
      //   if (!draggingNode.children || draggingNode.children === []) {
      //     draggingNode.leaf = true;
      //   }
      //   sysOrgService
      //     .moveNode({
      //       now: parentNodeData ? parentNodeData.id : '1',
      //       id: currentNodeData.id,
      //       position: currentPosition
      //     })
      //     .then(serverData => {
      //       this.messageService.add({
      //         severity: 'success',
      //         summary: '系统提示',
      //         detail: serverData.info
      //       });
      //       currentNodeData.parentId = parentNodeData
      //         ? parentNodeData.id
      //         : null;
      //     });
      // } else {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: '系统提示',
      //     detail: '禁止移动到根节点，请重新移动！'
      //   });
      // }
    },
    /**
     * 树节点右键操作
     */
    showContextmenu($event, data, node) {
      console.log($event, data, node);
      this.$refs.ctxshow.showMenu();
      this.treeForm = JSON.parse(JSON.stringify(data));
      this.curTreeNode = data;
      console.log(this.treeForm);
      this.curOrg = JSON.parse(JSON.stringify(data));
      // 从服务中获取格式化后的所有角色数据
      this.roles = [];
      this.selectRoles = [];
      sysOrgService.getSelectUnitAction(this.curTreeNode.id).then(data => {
        data.map(item => {
          const obj = {
            value: item.id,
            label: item.rolenm
          };
          this.roles.push(obj); // 将 obj 添加到数组中用于 ngFor 生成多个 p-checkbox 组件
          if (item.checked) {
            this.selectRoles.push(item.id); // 存储已选中的 p-checkbox 组件的 value 值
          }
        });
      });
    },
    /**
     * 右键树添加
     */
    add() {
      this.dialogTreeTitle = '添加';
      this.treeFormVisible = true;
      this.selectRoles = [];
      this.treeForm = {
        name: '',
        principal: '',
        tel: '',
        email: '',
        address: '',
        district: ''
      };
    },
    /**
     * 右键树编辑
     */
    edit() {
      this.dialogTreeTitle = '编辑';
      this.treeFormVisible = true;
    },
    /**
     * 右键树删除
     */
    deleteNav() {
      this.$confirm(`你确定删除【${this.treeForm.name}】组织机构吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysOrgService.deleteResource(this.treeForm.parentId).then(res => {
          if (res.code === 'ok') {
            this.getResources();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      });
    },
    /**
     * 确认提交
     */
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.dialogTitle === '添加') {
            this.addKhh();
          } else {
            this.editKhh();
          }
        } else {
          return false;
        }
      });
    },
    /**
     * 获取用户列表
     */
    getUserListPage() {
      console.log(this.treeForm);
      const params = {
        conditions: [
          {
            fieldName: 'unitid',
            value: this.treeForm.id,
            operator: 'EQ'
          }
        ],
        fileds: ['nm', 'realName', 'tel', 'email', 'job'],
        currentPage: this.search.currentPage,
        pageSize: this.search.pageSize,
        search: ''
      };
      sysOrgService.getUserListPage(params).then(res => {
        if (res.code === 'ok') {
          this.userList = res.result.items;
          this.pageCount = res.result.pageCount;
        }
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
      height: calc(100% - 130px);
      margin: 20px;
      background: #fff;
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
      height: 740px;
      margin: 40px 20px 0;
      background: #fff;
      .bottom-page {
        text-align: center;
        margin-top: 10px;
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
