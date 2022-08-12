// Конфигурирую подключение к базе данных
// Импортирую  Sequelize сразуже делаю деструктуризацтю,
// Так как модуль большой, а нам нужен именно этот класс!!
const { Sequelize } = require('sequelize')
// Для возможности считывания файлов ENV, импортируем конфиг из модуля 
require ('dotenv').config()
// На выходе экспортирую объект который я создаю из этого класса !!!
module.exports = new Sequelize(
  // В конструкторе указываю конфигурацию
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Имя пользователя
  process.env.DB_PASSWORD, // Пароль
  // Передаю объект со следующими полями:
  {
    dialect: "postgres", // Передача пользователя,под которым подключаюсь
    host: process.env.DB_HOST, // Хост
    port: process.env.DB_PORT, // Порт
  }
);
// С конфигурацией поконченно!