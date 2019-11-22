import request from '@/services/request.service.js';
const sysRole = {
  /**
   * 获取角色列表
   */
  getRoles() {
    return request.get('/RoleController/getRoleList');
  },
  /**
   * 获取资源树
   */
  getResourceTree() {
    return request.get('/ResourceController/getResourceTree')
  },
  /**
   * 根据id获取角色资源
   * @param {根据id获取角色资源} id
   */
  getRoleresource(id) {
    return request.get(`/RoleController/queryRole/${id}`);
  },
  /**
   * 分配角色资源
   * @param {分配角色资源} params
   */
  addRoleresource(params) {
    return request.post('/RoleController/updateRoleResource', params)
  },
  /**
   * 添加角色
   * @param {添加角色} params
   */
  addRole(params) {
    return request.post('/RoleController/addRole', params)
  },
  /**
   * 编辑角色
   * @param {编辑角色} params
   */
  updateRole(params) {
    return request.post('/RoleController/updateRole', params)
  },
  /**
   * 删除角色
   * @param {删除角色} id
   */
  deleteRole(id) {
    return request.get(`/RoleController/deleteRole/${id}`);
  }
}
export default sysRole;
