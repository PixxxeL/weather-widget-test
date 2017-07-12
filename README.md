# Weather Widget Test

Task for JS and Node.JS skills verification

## Задача

Необходимо написать виджет, при размещении кода которого на любой странице любого 
сайта появлялся бы прогноз погоды для Москвы, Санкт-Петербурга, либо Нижнего 
Новгорода.

API для получения можно использовать любой. Данные должны быть агрегированы в базу 
Redis, серверный код должен быть написан на node.js

Должен быть реализован web-интерфейс, реализующий следующие возможности:

 * создание любого количества экземпляров виджетов со своими настройками;
 * изменение настроек ранее созданных виджетов;
 * получение кода виджета для вставки его на страницу;

Настройки, доступные из интерфейса:

 * Город
 * На сколько дней выдавать прогноз (1, 3 или на неделю)
 * Горизонтальный или вертикальный блок

Технологии, необходимые к использованию в задании:

 * Окружение:
   * http://nodejs.org
   * http://redis.io
 * Библиотеки и фреймворки:
   * http://getbootstrap.com
   * http://expressjs.com
   * https://github.com/mranney/node_redis или https://github.com/luin/ioredis
   * https://github.com/request/request
   * https://github.com/pugjs/pug

Клиентский код, реализующий размещение виджета на сторонней странице, должен быть 
реализован с минимальным использованием сторонних фреймворков.

Отдельным большим плюсом будут:

 * реализация регистрации и входа пользователей с возможностью создания виджетов для 
каждого пользователя отдельно. Библиотека для авторизации: http://passportjs.org;
 * реализация предыдущего пункта с применением СУБД MongoDB или MySQL и 
использование библиотек http://mongoosejs.com или http://sequelizejs.com;
 * реализация автоматического тестирования кода;
