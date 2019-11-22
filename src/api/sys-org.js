import request from '../services/request.service';

const sysOrg = {
  /**
	 * 获取选中单位已有权限
	 * @param id 单位id
	 * */
  getSelectUnitAction(id) {
    const post1 = new Promise((resolve) => { resolve(this.getRoleData()) }); // 获取所有角色
    const post2 = new Promise((resolve) => { resolve(this.getUnitRoleData(id)) }); // 获取该单位角色
    return Promise.all([post1, post2]).then((value) => {
      value[0].result.map((role, i) => {
        value[1].result.roles.map((actionRole) => {
          if (role.id === actionRole.id) {
            value[0].result[i].checked = true;
          }
        });
      });
      return value[0].result;
    }).catch((error) => {
      console.log(error)
    })
  },
  /**
 * 获取选中用户已有权限
 * @param user 用户信息
 * @param isUser 判断
 * @returns {Observable<roles>}
 * */
  getSelectUserController(user, isUser) {
    if (isUser) {
      const post1 = new Promise((resolve) => { resolve(this.getRoleData()) }); // 获取所有角色
      const post2 = new Promise((resolve) => { resolve(this.getUnitRoleData(user.unitid)) }); // 获取该用户单位权角色
      const post3 = new Promise((resolve) => { resolve(this.getUserRoleData(user.id)) }); // 获取该用户角色
      return Promise.all([post1, post2, post3]).then((value) => {
        value[0].result.map((role, i) => {
          value[1].result.roles.map((unitRole) => {
            if (role.id === unitRole.id) {
              value[0].result[i].checked = true;
              value[0].result[i].disabled = true;
            }
          });
          value[2].result.roles.map((userRole) => {
            if (role.id === userRole.id) {
              value[0].result[i].checked = true;
            }
          });
        });
        return value[0].result;
      }).catch((error) => {
        console.log(error)
      })
    } else {
      const post1 = new Promise((resolve) => { resolve(this.getRoleData()) }); // 获取所有角色
      const post2 = new Promise((resolve) => { resolve(this.getUnitRoleData(user.id)) }); // 获取该用户单位权角色
      return Promise.all([post1, post2]).then((value) => {
        value[0].result.map((role, i) => {
          value[1].result.roles.map((unitRole) => {
            if (role.id === unitRole.id) {
              value[0].result[i].checked = true;
              value[0].result[i].disabled = true;
            }
          });
        });
        return value[0].result;
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  /**
   * 获取角色数据
   * @returns {Observable<ServerData>}
   */
  getRoleData() {
    return request.get('/RoleController/getRoleList');
  },

  /**
   * 获取单位授权数据
   * @param id
   * @returns {Observable<ServerData>}
   */
  getUnitRoleData(id) {
    return request.get('/UnitController/queryUnit/' + id);
  },

  /**
   * 获取角色授权数据
   * @returns {Observable<ServerData>}
   */
  getUserRoleData(id) {
    return request.get('/UserController/queryUser/' + id);
  },

  /**
   * 给单位授权
   * @param obj
   * @returns {Observable<ServerData>}
   */
  addUnitRole(obj) {
    return request.post('/UnitController/updateUnitRole', obj);
  },

  /**
   * 给用户授权
   * @param obj
   * @returns {Observable<ServerData>}
   */
  addUserRole(obj) {
    return request.post('/UserController/updateUserRole', obj);
  },

  /**
   * 获取所有用户分页列表
   * @param obj
   * @returns {Observable<ServerData>}
   * */
  getUserListPage(obj) {
    return request.post('/UserController/getUserListPage', obj);
  },

  /**
   * 删除用户
   * @param id 用户ID
   * @returns {Observable<ServerData>}
   * */
  deleteSysUser(id) {
    return request.get('/UserController/deleteUser/' + id);
  },

  /**
   * 重置密码
   * @param obj
   * @returns {Observable<ServerData>}
   * */
  resetPassword(obj) {
    return request.post('/UserController/resetPassword', obj);
  },

  /**
   * 更新org
   * @param obj
   * @returns {Observable<ServerData>}
   * */
  updateOrg(obj) {
    return request.post('/auth/org/update', obj);
  },
  /**
   * 获取组织机构列表
   * @returns {Observable<ServerData>}
   */
  getSysUnitListTree() {
    return request.get('/UnitController/getUnitTree');
  },
  /**
   * 更新组织机构
   * @param obj
   * @returns {Observable<ServerData>}
   */
  updateSysUnit(obj) {
    return request.post('/UnitController/updateUnit', obj);
  },

  /**
   * 添加组织机构
   * @param obj
   * @returns {Observable<ServerData>}
   */
  addSysUnit(obj) {
    return request.post('/UnitController/addUnit', obj);
  },

  /**
   * 删除组织机构
   * @param {string} id 组织机构id
   * @returns {Observable<ServerData>}
   */
  deleteSysUnit(id) {
    return request.get('/UnitController/deleteUnit/' + id);
  },

  /**
   * 拖动组织机构节点
   * @param obj
   * @returns {Observable<ServerData>}
   */
  moveNode(obj) {
    return request.post('/UnitController/moveNode', obj);
  },

  /**
   * 添加用户
   * @param {User} user
   * @returns {Observable<ServerData>}
   */
  addSysUser(user) {
    return request.post('/UserController/addUser', user);
  },
  /**
   * 更新用户
   * @param {User} user
   * @returns {Observable<ServerData>}
   */
  updateSysUser(user) {
    return request.post('/UserController/updateUser', user);
  }
};

export default sysOrg;
