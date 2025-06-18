import api from "./api";

export async function getPedidosCredencial(setData) {
  const token = localStorage.getItem('userToken')
  if (!token){
    console.log('Você precisa está logado e ser um adm.')
    return;
  }

  try {
    const response = await api.get('/pedidos-credencial/', {
      headers: { Authorization: `Token ${token}` }
    })

    console.log('Sucesso ao buscar pedidos: ', response.data)
    setData(response.data)
  } catch (error) {
    console.log('Erro ao tentar buscar pedidos: ', error.response || error.message)
  }
}


export async function getPedidoDetalhes(idPedido, setData) {
  const token = localStorage.getItem('userToken')
  if (!token){
    console.log('Você precisa está logado e ser um adm.')
    return;
  }

  try {
    const response = await api.get(`/pedidos-credencial/${idPedido}/`, {
      headers: { Authorization: `Token ${token}` }
    })

    console.log('Sucesso ao buscar detalhes do pedido: ', response.data)
    setData(response.data)
  } catch (error) {
    console.log('Erro ao tentar buscar detalhes do pedido: ', error.response || error.message)
  }
}

export async function atualizarStatusPedido(idPedido, status, setData) {
  const token = localStorage.getItem('userToken')
  if (!token){
    console.log('Você precisa está logado e ser um adm.')
    return;
  }

  try {
    const response = await api.post(`/pedido/${idPedido}/atualizar-status/`, 
    {status: status},
    {
      headers: { Authorization: `Token ${token}` }
    })

    console.log('Sucesso ao atualizar status do pedido: ', response.data)
  } catch (error) {
    console.log('Erro ao tentar atualizar status do pedido: ', error.response || error.message)
  }
}

