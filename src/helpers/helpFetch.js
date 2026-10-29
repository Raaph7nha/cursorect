
export const helpFetch = () => {
  const URL = "/crudAPI"

  const customFetch = (endpoint, options = {}) => {
    const config = {
      ...options,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    }

    if (options.body && typeof options.body !== "string") {
      config.body = JSON.stringify(options.body)
    }

    const cleanURL = `${URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`

    return fetch(cleanURL, config)
      .then(async response => {
        const data = response.status === 204
          ? null
          : await response.json()

        if (!response.ok) {
          return {
            error: true,
            status: response.status,
            statusText: data?.message || response.statusText
          }
        }

        return data
      })
      .catch(error => {
        console.error("Error en la petición:", error)

        return {
          error: true,
          statusText: error.message || "Error: No se ha logrado la petición."
        }
      })
  }

  const get = endpoint => customFetch(endpoint)

  const post = (endpoint, options = {}) =>
    customFetch(endpoint, {
      ...options,
      method: "POST"
    })

  const put = (endpoint, options = {}, id) =>
    customFetch(`${endpoint}/${id}`, {
      ...options,
      method: "PUT"
    })

  const del = (endpoint, id) =>
    customFetch(`${endpoint}/${id}`, {
      method: "DELETE"
    })

  return { get, post, put, del }
}
