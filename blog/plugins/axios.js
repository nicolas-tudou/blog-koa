export default function ({ $axios, redirect }) {
  // $axios.onRequest(config => {
  //   console.log('Making request to ' + JSON.stringify(config))
  // })
  $axios.onResponse(res => {
    if (res.data.success) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  })

  $axios.onError(error => {
    console.log('error', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}