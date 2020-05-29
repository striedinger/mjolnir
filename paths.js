const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  clientBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  dotEnv: resolveApp('.env'),
  srcClient: resolveApp('lib/client'),
  srcServer: resolveApp('lib/server'),
  publicPath: '/'
};

module.exports = paths;
