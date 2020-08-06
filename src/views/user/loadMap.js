
export default function loadMap(key, plugins, v = '1.4.14') {
    return new Promise(function(resolve, reject) {
        if (typeof AMap !== 'undefined') {
            // eslint-disable-next-line no-undef
            resolve(AMap)
            return true
        }
        window.onCallback = function() {
            // eslint-disable-next-line no-undef
            resolve(AMap)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://webapi.amap.com/maps?v=1.4.15&key=0cf0d60edb40824ff15e85359d49a79d&callback=onCallback`
        script.onerror = reject
        document.head.appendChild(script)
    })
}
