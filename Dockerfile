# Use uma imagem base oficial do Node.js
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Expõe a porta que a aplicação vai usar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]
