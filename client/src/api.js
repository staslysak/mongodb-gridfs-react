const api = {
  getImages: async () => {
    return await fetch('/files')
      .then(res => res.json())
      .then(res => res.files)
  },
  deleteImage: async (id) => {
    return await fetch('/files/' + id, {
      method: 'DELETE',
    })
      .then(() => api.getImages())
  },
  postImages: async (data) => {
    return await fetch('/upload', {
      method: 'POST',
      body: data,
      headers: {
        // 'Accept': 'image/png, image/jpeg',
        // 'Content-Type': 'multipart/form-data'
      },
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .then(() => api.getImages())
  }
}

export default api
