Для установки необходимо
скачать репозитарий
  git clone https://github.com/avshirokikh/todos

установить пакеты для api сервера в папке todos
  npm i

установить пакеты для api сервера в папке todos/client
  npm i

настроить переменные окружения в файлах todos/.env и todos/client/.env касающиеся адресов хоста и порта. при необходимости изменить логин и пароль к базе данных помимо этих файлов необходимо отредактировать todos/db/docker-compose.yml 

запустить докер в папке todos/db
  docker-compose up --build


запустить api сервер в папке todos
  node index

запустить web приложение todos в папке todos/client
  npm start

список пользователей для входа и их пароли
director:password
zam1:password
zam2:password
user1_1:password
user1_2:password
user2_1:password
user2_2:password
