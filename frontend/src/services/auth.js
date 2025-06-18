import api from "./api";

export async function loginUser(email, password, navigate) {
  try {
    const response = await api.post('/login/', {
     email: email, 
     password: password,
    })
    const token = response.data.token
    localStorage.setItem('userToken', token)
    localStorage.setItem('userEmail', response.data.user.email)
    
    console.log('Usuário logado! token: ', response.data.token)
    navigate('dashboard/')
  } catch (error) {
    console.log('Erro ao fazer login: ', error.message)
  }
}

