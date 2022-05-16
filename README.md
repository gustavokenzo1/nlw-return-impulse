# NLW Return - Trilha Impulse

## FeedGet

FeedGet foi o projeto proposto pela Rocketseat para a trilha Impulse nesse NLW. Ele consiste em um widget de coleta de feedbacks, em que o usuário pode selecionar o tipo de feedback, tirar uma screenshot e enviar um e-mail utilizando o serviço MailTrap.

## Extra Mile: Qualquer alteração em cima disso

### Alterações:

Como a ideia é ser um widget de feedbacks que interage com um backend, é importante que ele seja reutilizável em outras aplicações de maneira fácil. Para isso, na Landing Page que eu criei para o projeto, há a possibilidade de informar um e-mail, para que seja criada uma Organização para cada projeto. Com isso, o usuário recebe uma chave para a API, a qual ele passará como props no componente do FeedGet.

Dentro de uma organização, há os usuários. Eu resolvi criar um CRUD (Create, Read, Update, Delete) de usuários justamente para que os usuários do site possam acompanhar por meio de uma Dashboard pessoal os status de todos os seus feedbacks enviados. Além dos usuários normais, há os Admins, que têm o poder de ler todos os feedbacks de todos os usuários, marcar como lido, excluir, ordenar os feedbacks por tipos, listar todos os usuários cadastrados e transformar um usuário em Admin. 

Para criar um usuário, basta fazer o registor por meio do próprio FeedGet, que é um processo bem simples, assim como o de login.

Quanto aos e-mails, o MailTrap é um serviço utilizado durante o processo de desenvolvimento da aplicação. Então, para colocar em produção, eu utilizei o serviço do Gmail. Primeiramente, alterei o estilo do e-mail para se adequar melhor à identidade visual do projeto. Depois, coloquei para que os e-mails sejam enviados para todos os Admins e para o usuário (caso esteja logado) quando um feedback é enviado. Como mencionando anteriormente, um e-mail também é enviado quando um usuário solicita  a criação de uma organização. Além disso, o usuário também recebe um e-mail quando um feedback é marcado como lido pelo admin.

Para finalizar, aquele Theme Switcher básico, pois estamos em 2022 (ah, e ainda tem um easter egg na página principal da landing page).
