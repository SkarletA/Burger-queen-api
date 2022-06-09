const express = require('express');
const cors = require('cors');
const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');

const menuLunchSchema = require('../models/menuLunchSch');
/** @module menuLunch */
module.exports = (app, nextMain) => {
  app.use(express.json());
  app.use(cors());

  const corsOptions = {
    origin: 'http://localhost:3000',
    optionSucessStatus: 200,
  };
    /**
   * @name GET /menuLunch
   * @description Lista productos
   * @path {GET} /menuLunch
   * @query {String} [page=1] Página del listado a consultar
   * @query {String} [limit=10] Cantitad de elementos por página
   * @header {Object} link Parámetros de paginación
   * @header {String} link.first Link a la primera página
   * @header {String} link.prev Link a la página anterior
   * @header {String} link.next Link a la página siguiente
   * @header {String} link.last Link a la última página
   * @auth Requiere `token` de autenticación
   * @response {Array} menuLunch
   * @response {String} menuLunch[]._id Id
   * @response {String} menuLunch[].name Nombre
   * @response {Number} menuLunch[].price Precio
   * @response {URL} menuLunch[].image URL a la imagen
   * @response {String} menuLunch[].type Tipo/Categoría
   * @response {Date} menuLunch[].dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   */
  app.get('/menuLunch', cors(corsOptions), requireAuth, (req, resp, next) => {
    menuLunchSchema
      .find()
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  /**
   * @name GET /menuLunch/:productId
   * @description Obtiene los datos de un producto especifico
   * @path {GET} /menuLunch/:productId
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.get('/menuLunch/:menuLunchId', cors(corsOptions), requireAuth, (req, resp, next) => {
    const { menuLunchId } = req.params;
    menuLunchSchema
      .findById(menuLunchId)
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  /**
   * @name POST /menuLunch
   * @description Crea un nuevo producto
   * @path {POST} /menuLunch
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @body {String} name Nombre
   * @body {Number} price Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} menuLunch._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican `name` o `price`
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.post('/menuLunch', requireAdmin, (req, resp, next) => {
    const menuLunch = menuLunchSchema(req.body);
    menuLunch
      .save()
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  /**
   * @name PUT /menuLunch
   * @description Modifica un producto
   * @path {PUT} /menuLunch
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación y que el usuario sea **admin**
   * @body {String} [name] Nombre
   * @body {Number} [price] Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican ninguna propiedad a modificar
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.put('/menuLunch/:menuLunchId', requireAdmin, (req, resp, next) => {
    const { menuLunchId } = req.params;
    const {
      name, price, popularity, image,
    } = req.body;
    menuLunchSchema
      .updateOne({ _id: menuLunchId }, {
        $set: {
          name, price, popularity, image,
        },
      })
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  /**
   * @name DELETE /menuLunch
   * @description Elimina un producto
   * @path {DELETE} /menuLunch
   * @params {String} :productId `id` del producto
   * @auth Requiere `token` de autenticación y que el usuario sea **admin**
   * @response {Object} product
   * @response {String} product._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es ni admin
   * @code {404} si el producto con `productId` indicado no existe
   */
  app.delete('/menuLunch/:menuLunchId', requireAdmin, (req, resp, next) => {
    const { menuLunchId } = req.params;
    menuLunchSchema
      .remove({ _id: menuLunchId })
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  nextMain();
};
