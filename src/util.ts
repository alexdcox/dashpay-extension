export const randomColor = () => '#' + [...Array(6)].map(() => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')

export const fetchJson = async (method: string, url: string, data?: any, headers?: any) => {
  method = method.toUpperCase()
  let opts: any = {method}
  if (data) {
    opts.body = JSON.stringify(data)
  }
  if (headers) {
    let h = new Headers()
    Object.entries(headers).forEach(([k, v]) => h.append(k, v as string))
    opts.headers = h
  }
  return await fetch(url, opts).then(async rsp => {
    const ret: any = {
      ok: false,
      method,
      url,
      data,
      headers,
      statusCode: rsp.status,
      status: rsp.status,
    }
    try {
      ret.text = await rsp.text()
    } catch (ex) {
      return {...ret, exception: ex}
    }
    try {
      ret.json = JSON.parse(ret.text)
    } catch (ex) {
      // NO ACTION: It might not be json
    }
    ret.ok = String(rsp.status)[0] === '2'
    return ret
  }).catch(ex => {
    return {ok: false, exception: ex}
  })
}

export const toClipboard = (val: string) => navigator.clipboard.writeText(val);

export const debounce = (fn: (...args: any) => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}
