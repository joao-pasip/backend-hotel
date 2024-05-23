# Back-hotel

Aplicação foi desenvolvida usando Node / JavaScript, Query Builder Knex, Express e Postgres.

## Teste

O teste consiste em:
- Criar uma Base de Dados em Postgres:
	- Tabelas:
		- Hospedes ( Tabela com responsabilidade de registrar dados da pessoa fisica do hospede , nome, endereço, etc );
		- Reservas ( Dados Relacionados a reserva em um hotel - numero da reserva, data check in , data chekout, status );
		- ReservaHospedes ( Tabela de vinculo entre hospede e reservas ).

Obs.: Pode usar a imagem do Postgres no Docker e fazer a conexão ao banco de acordo com as informações presentes no arquivo ``knexfile.js``.

## Para clonar o projeto

Basta rodar o comando abaixo no seu terminal:

```bash
# Clona o projeto do remoto para o local utilizando SSH
git clone git@github.com:joao-pasip/backend-hotel.git
```

## Siga as etapas abaixo para rodar o projeto em sua máquina

1. Basta entrar no diretório do projeto com o seguinte comando:

```bash
cd backend-hotel
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. Para rodar o projeto, utilize o comando abaixo no seu terminal:

```bash
npm run dev
```

## Agradecimentos

Gostaria desde já de agradecer pela oportunidade de participar do processo seletivo. Me esforcei para entregar o que foi pedido, dividindo em camadas e separando as responsabilidades com arquitetura de software. 

Foram muitos aprendizados! Meu sentimento é de gratidão!

Segue as minhas redes sociais para conexões:

> João Paulo Silva Piauhy - Linkedin: [Linkedin](https://www.linkedin.com/in/joaopasip/).

> João Paulo Silva Piauhy - Instagram: [Instagram](https://www.instagram.com/joaopasip/).
