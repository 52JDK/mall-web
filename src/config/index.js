// 一些全局的config配置
const modeUrlObj = {
    // 生产环境
    'production': {
        basePath: 'https://mappssl.lppz.com',
        webPath: 'https://exter-sp.lppz.com',
        appCustomer:'http://kf.lppz.com'
    },
    // 开发环境
    'development': {
        basePath: 'http://10.101.3.13:8080',
        webPath: 'https://exter-sp-t.lppz.com',
        appCustomer:'http://wxkf.t.lp.com'
    },
    // 测试环境
    'test': {
        basePath: 'http://10.101.3.13:8080',
        webPath: 'https://exter-sp-t.lppz.com',
        appCustomer:'http://wxkf.t.lp.com'
    }
}
export default modeUrlObj[process.env.NODE_ENV]