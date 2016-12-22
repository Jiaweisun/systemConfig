
hapijs 是一个简单的配置中心架构，它内嵌表单验证，缓存，授权和其他构建web应用和服务的基础功能。适用于大型项目。

#### packages:

the server has lib, logs, node_modules, and resources folder.
the core in server is lib folder which has dao, entity, pages, routers, and utils folder. Both logs and node_modules folder are auto generated at run time.
there is a connection information for database in resources folder.


notice:

##### 1. bell (third-party authentication plugin for hapi)
bell can't be used alone as a login system except for single-page applications that require loading a single source.
once the handler is called, the application must set its own session management.
A common solution is to combine bell with the hapi-auth-cookie authentication scheme plugin.

#### 2. 

