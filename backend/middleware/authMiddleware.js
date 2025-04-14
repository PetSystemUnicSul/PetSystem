import jwt from 'jsonwebtoken';

export default function authMiddleware(request, reply, done) {
  // Obter o token do cabeçalho de autorização
  const authHeader = request.headers.authorization;
  
  if (!authHeader) {
    return reply.code(401).send({ error: 'Token não fornecido' });
  }
  
  // O formato esperado é "Bearer TOKEN"
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2) {
    return reply.code(401).send({ error: 'Erro no formato do token' });
  }
  
  const [scheme, token] = parts;
  
  if (!/^Bearer$/i.test(scheme)) {
    return reply.code(401).send({ error: 'Token mal formatado' });
  }
  
  // Verificar se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return reply.code(401).send({ error: 'Token inválido ou expirado' });
    }
    
    // Adicionar informações do usuário ao request para uso nas rotas protegidas
    request.user = decoded;
    done();
  });
}