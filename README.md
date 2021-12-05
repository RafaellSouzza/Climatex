# Climatex

A URL da imagem de fundo deve ser extraida da [API do Bing](https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR).

Para consultar a previsão do tempo, utilize a do [OpenWeather](http://api.openweathermap.org/data/2.5/weather?q={{location_name}}&APPID=7ba73e0eb8efe773ed08bfd0627f07b8) informando o nome da localidade no lugar de `{{location_name}}` usando a app id `7ba73e0eb8efe773ed08bfd0627f07b8`. Caso necessário, crie uma nova conta.

Para converter latitude e longitude em uma localidade utilize o [OpenCage](https://api.opencagedata.com/geocode/v1/json?q={{latitude}},{{longitude}}&key=c63386b4f77e46de817bdf94f552cddf&language=en) usando a API key `c63386b4f77e46de817bdf94f552cddf`. Caso necessário, crie uma nova conta.

Os ícones podem ser encontrados em http://www.alessioatzeni.com/meteocons/.

O layout deve ser seguido, mas você pode sugerir melhorias. Descreva essas melhorias no README e diga o por que delas. Você ganha pontos extras se essas melhorias forem positivas, ou perde pontos do contrário.

## Baixando o projeto
- git clone [https://github.com/RafaellSouzza/Climatex.git](https://github.com/RafaellSouzza/Climatex.git)
- cd challenge-charlie

## Rodando o microsite localmente
- npm install
- npm run serve

## Rodando o microsite em um ambiente de stage com Docker
1. Crie a imagem
    - docker build -t docker/climatex .
2. Rode a imagem
    - docker run -it -p 8080:8080 --rm --name climatex  docker/climatex
3. Acesse a url: http://localhost:8080

## Rodando o microsite em um ambiente de produção com Docker
1. Crie a imagem de produção
    - docker build -t  docker/climatex-production -f Dockerfile.production .
2. Rode a imagem
    - docker run -it -p 80:80 --rm --name  climatex-production  docker/climatex-production
3. Acesse a url: http://localhost
