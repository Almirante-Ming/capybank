# Escolhe a imagem base
FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos da aplicação para o contêiner
COPY capyBank ~/projects/capyBank

# Expõe a porta que a aplicação usará
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["node", "app.js"]
