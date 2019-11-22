import request from '../services/request.service';

const sysResource = {

  /**
	 * 获取资料列表
	 * @returns {Observable<ServerData>}
	 */
  getResources() {
    return request.get('/ResourceController/getResourceTree');
  },
  /**
	 * 添加资源
	 * @param resource
	 * @returns {Observable<ServerData>}
	 */
  addResource(param) {
    return request.post('/ResourceController/addResource', param);
  },

  /**
	 * 更新资源
	 * @param resource
	 * @returns {Observable<ServerData>}
	 */
  updateResource(param) {
    return request.post('/ResourceController/updateResource', param);
  },

  /**
	 * 删除资源
	 * @param resource
	 * @returns {Observable<ServerData>}
	 */
  deleteResource(param) {
    return request.get('/ResourceController/deleteResource/' + param);
  }
};

export default sysResource;
