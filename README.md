# Nuota
Nuota é um detector de promoções [crowd sourced](https://en.wikipedia.org/wiki/Crowdsourcing) e agrupador de gastos mensais baseado em escaneamento de QR Code de notas fiscais.

## Motivação
Esse projeto é material de avaliação na disciplina Programação 3 (desenvolvimento Android) do curso de Sistemas de Informação do Centro de Informática da UFPE, do perído 2020.3. Além disso, a proposta de solução desse aplicativo surgiu de uma demanda de um dos integrantes da equipe que gostaria de saber como e onde poderia economizar nas compras de alimentos, que representam boa parte do seu orçamento mensal. Também, tendo os dados disponíveis para o usuário, há uma grande oportunidade de criar um gerenciador de gastos mais robusto em futuras iterações.

## Arquitetura
O frontend do Nuota foi escrito em Android nativo utilizando Kotlin. Seu backend é serverless feito no stack da Firebase (Authentication, Firestore, Functions e Messaging)

É possível ter mais alguns detalhes de como a principal funcionalidade do app está desenhada na pasta [./documentation](https://github.com/ricardoebbers/nuota/tree/master/documentation).

## Funcionalidades
* Extrair dados de notas fiscais a partir do escaneamento do QR Code
* Ser notificado quando algum produto do interesse do usuário está em promoção na região que ele se encontra
* Mapear rota para os locais das promoções
* Visualizar os gastos mensais com base nas notas fiscais escaneadas

