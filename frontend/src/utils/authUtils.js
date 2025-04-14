// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Retorna true se o token existir
  };
  
  // Função para obter o token
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Função para obter os dados do usuário
  export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };
  
  // Função para logout
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  // Função para adicionar o token nas requisições
  export const getAuthHeaders = () => {
    const token = getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };