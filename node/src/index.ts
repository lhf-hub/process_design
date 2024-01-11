import Express from 'express';
import Cors from 'cors';
import Path from 'path';
import Open from 'open';
import DbConfig from './dbconfig/config.ts';
import Mysql from 'mysql';
import Home from './routes/home';
import { GlobalInit } from './GlobalInit.ts';
import { Client } from './routes/client.ts';
import { Employee } from './routes/employee.ts';
import { User } from './routes/User.ts';
import { Project } from './modules/project/Project.ts';
import { ProcessLog } from './modules/project/process_log/ProcessLog.ts';
import { Mission } from './modules/project/mission/Mission.ts';
import { Cloud } from './modules/cloud/Cloud.ts';
import { analysis } from './routes/analysis.ts';
const App = Express();
const Port = 5000;
export const ConnectionPool = Mysql.createPool(DbConfig);
App.use(Cors());
App.use('/', Home);
App.use(Client);
App.use(Employee);
App.use(User);
App.use(Project);
App.use(ProcessLog);
App.use(Mission);
App.use(Cloud);
App.use(analysis);
App.use(Express.static(Path.join(__dirname, '../', 'resources', 'static')));
GlobalInit();
App.listen(Port, () => {
  console.log(`服务在${Port}端口启动`);
  Open(`http://localhost:${Port}`);
});


