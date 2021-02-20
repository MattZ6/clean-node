# Usa o node 12.x.x
FROM node:12

WORKDIR /usr/src/clean-node-api

# Copia o package.json para o WORKDIR do container
COPY ./package.json .

# Instala somente as dependências de produção
RUN yarn --prod

# Copia a pasta dist para a pasta ./dist do container
COPY ./dist ./dist

# Deixa o container acessível a partir de uma porta específica
EXPOSE 3333

CMD yarn start
