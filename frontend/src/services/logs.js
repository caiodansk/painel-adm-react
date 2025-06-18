import api from "./api";

export async function getLogs(setData) {
  const token = localStorage.getItem('userToken')
  if (!token){
    console.log('Você precisa está logado e ser um adm.')
    return;
  }

  try {
    const response = await api.get(`/logs/`,
    {
      headers: { Authorization: `Token ${token}` }
    })

    console.log('Sucesso ao buscar logs: ', response.data)
    setData(response.data)
  } catch (error) {
    console.log('Erro ao tentar buscar logs: ', error.response || error.message)
  }
}

