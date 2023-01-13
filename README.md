# Установка 
Для установки необходимо скачать репозитарий. Для этого в корневой папке куда он будет скачан выполните\
  `git clone https://github.com/avshirokikh/todos`

### Установка пакетов для веб серверов
Перейдите в папку `todos` скачанного проекта  и установите пакеты для api сервера\
  `npm i`

Перейдите в папку `todos/client` скачанного проекта  и установите пакеты для web приложения todos\
  `npm i`

### Настройка параметров и запуск postgres
Приложение работает в связке с postgres, который в демонстрации настроен в docker. Имя базы, логин и пароль уже настроены. При необходимости изменить логин и пароль к базе данных помимо этих файлов необходимо отредактировать `todos/db/docker-compose.yml`.

Перейдя в папку todos/db скачанного проекта запустите его командой\
  `docker-compose up --build`

### Запуск веб приложения todos
Веб приложение todos использует в своей работе api web сервер. Для запуска необходимо настроить и запустить оба веб сервера. Для настройки отредактируйте переменные окружения в файлах `todos/.env` и `todos/client/.env`.

Перейдите в папку `todos` проекта и запустите api сервер\
  `node index`

Перейдите в папку `todos` проекта и запустите web приложение todos\
  `npm start`

## список пользователей для входа и их пароли
Приложение имеет предопределённый список пользователей, имена и пароли которых приведены ниже:\
director:password\
zam1:password\
zam2:password\
user1_1:password\
user1_2:password\
user2_1:password\
user2_2:password

## демо
демонстрация доступна по адресу [http://dev.mwlabs.ru:4000]

демонстрация запускается в ручном режиме, поэтому в случае перезапуска сервера, может потребоваться её перезапуск