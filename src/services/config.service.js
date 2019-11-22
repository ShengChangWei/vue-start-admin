import { devEnvironment } from '@/environments/environment.dev.js';
import { ProEnvironment } from '@/environments/environment.prod.js';

let configService = devEnvironment;

if (process.env.NODE_ENV === 'development') { // 生产环境有跨域
  configService = devEnvironment;
} else {
  configService = ProEnvironment;
}

export default configService;
