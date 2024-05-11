export const loadScript = (url: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve({
        success: true,
        message: '加载成功',
        url: url
      })
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'complete' || script.readyState == 'loaded') {
          resolve({
            success: true,
            message: '加载成功',
            url: url
          })
        } else {
          throw new Error(`加载失败 ${script.readyState}`)
        }
      }
    } else {
      script.onload = function () {
        resolve({
          success: true,
          message: '加载成功',
          url: url
        })
      }
      script.onerror = function (err) {
        throw new Error(`加载失败 ${err}`)
      }
    }
    script.src = url;
    document.head.appendChild(script);
  })

}