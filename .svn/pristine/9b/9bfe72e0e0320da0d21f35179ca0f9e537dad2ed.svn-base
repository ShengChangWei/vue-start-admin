import request from '../services/request.service';

const login = {
  loginByUserName(params) {
    return request.get('/mock/login.json', params);
  },
  logOut() {
    return request.get('/mock/logout.json');
  },
  /**
 * 获取当前用户菜单
 * @returns {Observable<any>}
 */
  getUserMenus() {
    return request.get('/mock/getUserMenus.json');
  },

  /**
	 * 当前当前用户资源
	 * @returns {Observable<ServerData>}
	 */
  getUserResources() {
    return request.get('/mock/getUserResources.json');
  }
};

export default login;
