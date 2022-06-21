const express = require('express');
// const bcrypt = require('bcrypt');
const cors = require('cors');
const staffSchema = require('../models/staffSch');
const config = require('../config');

const { urlServer } = config;

const {
  // requireAuth,
  requireAdmin,
} = require('../middleware/auth');

const {
  getUsers,
} = require('../controller/users');
// const res = require('express/lib/response');
// const req = require('express/lib/request');

const initAdminUser = (app, next) => {
  const { adminEmail, adminPassword } = app.get('config');
  if (!adminEmail || !adminPassword) {
    return next(403);
  }

  // const adminUser = {
  // email: adminEmail,
  // password: bcrypt.hashSync(adminPassword, 10),
  // roles: { admin: true },
  // };

  next();
};

/** @module users */
module.exports = (app, next) => {
  app.use(express.json());
  app.use(cors());

  const corsOptions = {
    origin: `${urlServer}:3000`,
    optionSucessStatus: 200,
  };
  /**
   * @name GET /staff
   * @description Lista usuarias
   * @path {GET} /staff
   * @query {String} [page=1] Página del listado a consultar
   * @query {String} [limit=10] Cantitad de elementos por página
   * @header {Object} link Parámetros de paginación
   * @header {String} link.first Link a la primera página
   * @header {String} link.prev Link a la página anterior
   * @header {String} link.next Link a la página siguiente
   * @header {String} link.last Link a la última página
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @response {Array} users
   * @response {String} users[]._id
   * @response {Object} users[].email
   * @response {Object} users[].roles
   * @response {Boolean} users[].roles.admin
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin
   */
  app.get('/staffs', cors(corsOptions), requireAdmin, getUsers);

  /**
   * @name GET /staff/:uid
   * @description Obtiene información de una usuaria
   * @path {GET} /staff/:uid
   * @params {String} :uid `id` o `email` de la usuaria a consultar
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin** o la usuaria a consultar
   * @response {Object} user
   * @response {String} user._id
   * @response {Object} user.email
   * @response {Object} user.roles
   * @response {Boolean} user.roles.admin
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin o la misma usuaria
   * @code {404} si la usuaria solicitada no existe
   */
  app.get('/staffs/:uid', cors(corsOptions), requireAdmin, async (req, resp, next) => {
    try {
      const { uid } = req.params;
      const user = await staffSchema.findById(uid);
      if (!user) {
        resp.status(404).json({ message: `El ${uid} no existe` });
      }
      resp.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  });

  /**
   * @name POST /staff
   * @description Crea una usuaria
   * @path {POST} /staff
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @body {Object} [roles]
   * @body {Boolean} [roles.admin]
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @response {Object} user
   * @response {String} user._id
   * @response {Object} user.email
   * @response {Object} user.roles
   * @response {Boolean} user.roles.admin
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si ya existe usuaria con ese `email`
   */
  app.post('/staffs', requireAdmin, cors(corsOptions), async (req, resp, next) => {
    // decodificar token, si es admin permitir si no denegar
    try {
      const staff = staffSchema(req.body);
      console.info(staff.email);
      const dbUser = await staffSchema.findOne({ email: staff.email }).exec();
      if (dbUser) return next(403);
      const user = await staff.save();
      if (!user) return next(404);

      resp.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  });

  /**
   * @name PUT /staff
   * @description Modifica una usuaria
   * @params {String} :uid `id` o `email` de la usuaria a modificar
   * @path {PUT} /staff
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @body {Object} [roles]
   * @body {Boolean} [roles.admin]
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin** o la usuaria a modificar
   * @response {Object} user
   * @response {String} user._id
   * @response {Object} user.email
   * @response {Object} user.roles
   * @response {Boolean} user.roles.admin
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin o la misma usuaria
   * @code {403} una usuaria no admin intenta de modificar sus `roles`
   * @code {404} si la usuaria solicitada no existe
   */
  app.put('/staffs/:uid', requireAdmin, async (req, resp, next) => {
    try {
      const { uid } = req.params;
      const {
        role, name, lastname, email, date,
      } = req.body;

      const user = await staffSchema
        .updateOne({ _id: uid }, {
          $set: {
            role, name, lastname, email, date,
          },
        });

      if (user.modifiedCount === 0) return next(404);

      resp.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  });

  /**
   * @name DELETE /staff
   * @description Elimina una usuaria
   * @params {String} :uid `id` o `email` de la usuaria a modificar
   * @path {DELETE} /staff
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin** o la usuaria a eliminar
   * @response {Object} user
   * @response {String} user._id
   * @response {Object} user.email
   * @response {Object} user.roles
   * @response {Boolean} user.roles.admin
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin o la misma usuaria
   * @code {404} si la usuaria solicitada no existe
   */
  app.delete('/staffs/:uid', requireAdmin, async (req, resp, next) => {
    try {
      const { uid } = req.params;
      const user = await staffSchema.deleteOne({ _id: uid });
      if (user.deletedCount === 0) return next(404);
      resp.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  });
  initAdminUser(app, next);
};
