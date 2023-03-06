// 服务器入口文件

// 1.创建koa实例对象
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({}));

const project = require('./routes/project');

// 2.绑定中间件

// 绑定第一层中间件(计算总耗时中间件)
const respDurationMiddleware = require('./middleware/koa_response_duration');
app.use(respDurationMiddleware);

// 绑定第二层中间件(响应头中间件)
const respHeaderMiddleware = require('./middleware/koa_response_header');
app.use(respHeaderMiddleware);

// 绑定第三层中间件(读取文件数据)
const respDataMiddleware = require('./middleware/koa_response_data');
app.use(respDataMiddleware);

// routes
app.use(project.routes(), project.allowedMethods());

// 3.监听端口
app.listen(9997, () => {
  // 只有请求地图数据时，用到了 9997端口
  console.log('Server Start Complete: \thttp://localhost:9997 \t ws://localhost:9998');
});

const WebSocketService = require('./service/web_socket_service');
// 开启服务端的监听，监听客户端的连接
// 当某一个客户端连接成功之后，就会对这个客户端进行 message 事件的监听
WebSocketService.listen();
