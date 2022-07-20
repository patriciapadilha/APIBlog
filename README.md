## APIBlog

### Projeto realizado durante o módulo de back-end na Trybe 💚

### Tecnologias utilizadas:
<div>
  <img width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt='icone do Node.js'>
  <p>Node.js</p>
  <img width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" alt='icone do Sequelize'>
  <p>Sequelize</p>
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" alt='icone do MySQL'>
  <p>MySQL</p>
  <br>
  <p>JWT: Para a autenticação por token</p>

</div>

---
### Arquitetura:
MSC: Model, Service e Controller.

---

### Sobre o desenvolvimento:
Neste projeto foi desenvolvida uma API e um banco de dados para a produção de conteúdo para um blog seguindo os princípios do REST.

![Diagrama de Entidade-Relacionamento](public/der.png)


---
### Regras de negócio:
* Ao realizar a criação de usuário um token é gerado;
* Apenas usuários logados e autenticados podem adicionar um post;
* Apenas o usuário que criou o post pode editar e excluir o mesmo;
* Um post não pode ser publicado sem as categorias;
* O usuário pode excluir seus próprios dados.