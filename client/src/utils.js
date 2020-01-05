export const displayFilesNames = (data) => {
  let str = ''
  for(let item of Object.values(data)){
    str += item.name + ', '
  }
  return str.slice(0, -2)
}

export const formatData = (data) => {
  const formData = new FormData();
  for(const name in data) {
    if(name === 'length') continue;
    formData.append('file', data[name]);
  }
  return formData;
}
