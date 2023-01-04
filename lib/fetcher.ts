export default function fetcher(url: string, data?: Record<string, string>) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log('res:', res)
    if (res.status > 399 || res.status < 200) {
      throw new Error('Request failed.')
    }
    return res.json()
  })
}
