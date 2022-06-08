const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');

const menuSchema = require('../models/menuSch');

/** @module products */
module.exports = (app, nextMain) => {
  /**
   * @name GET /menu
   * @description Lista productos
   * @path {GET} /menu
   * @query {String} [page=1] Página del listado a consultar
   * @query {String} [limit=10] Cantitad de elementos por página
   * @header {Object} link Parámetros de paginación
   * @header {String} link.first Link a la primera página
   * @header {String} link.prev Link a la página anterior
   * @header {String} link.next Link a la página siguiente
   * @header {String} link.last Link a la última página
   * @auth Requiere `token` de autenticación
   * @response {Array} products
   * @response {String} products[]._id Id
   * @response {String} products[].name Nombre
   * @response {Number} products[].price Precio
   * @response {URL} products[].image URL a la imagen
   * @response {String} products[].type Tipo/Categoría
   * @response {Date} products[].dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {401} si no hay cabecera de autenticación
   */
  app.get('/menu', requireAuth, (req, resp, next) => {
    menuSchema
      .find()
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  /**
   * @name GET /menu/:menuId
   * @description Obtiene los datos de un producto especifico
   * @path {GET} /menu/:menuId
   * @params {String} :menuId `id` del producto
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
   * @code {404} si el producto con `menuId` indicado no existe
   */
  app.get('/menu/:menuId', requireAuth, (req, resp, next) => {
    const { menuId } = req.params;
    menuSchema
      .findById(menuId)
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  /**
   * @name POST /menu
   * @description Crea un nuevo producto
   * @path {POST} /menu
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @body {String} name Nombre
   * @body {Number} price Precio
   * @body {String} [imagen]  URL a la imagen
   * @body {String} [type] Tipo/Categoría
   * @response {Object} product
   * @response {String} products._id Id
   * @response {String} product.name Nombre
   * @response {Number} product.price Precio
   * @response {URL} product.image URL a la imagen
   * @response {String} product.type Tipo/Categoría
   * @response {Date} product.dateEntry Fecha de creación
   * @code {200} si la autenticación es correcta
   * @code {400} si no se indican `name` o `price`
   * @code {401} si no hay cabecera de autenticación
   * @code {403} si no es admin
   * @code {404} si el producto con `menuId` indicado no existe
   */
  app.post('/menu', requireAdmin, (req, resp, next) => {
    const menu = menuSchema(req.body);
    menu
      .save()
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  /**
   * @name PUT /menu
   * @description Modifica un producto
   * @path {PUT} /menu
   * @params {String} :menuId `id` del producto
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
   * @code {404} si el producto con `menuId` indicado no existe
   */
  app.put('/menu/:menuId', requireAdmin, (req, resp, next) => {
    const { menuId } = req.params;
    const {
      name, price, popularity, image,
    } = req.body;
    menuSchema
      .updateOne({ _id: menuId }, {
        $set: {
          name, price, popularity, image,
        },
      })
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  /**
   * @name DELETE /menu
   * @description Elimina un producto
   * @path {DELETE} /menu
   * @params {String} :menuId `id` del producto
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
   * @code {404} si el producto con `menuId` indicado no existe
   */
  app.delete('/menu/:menuId', requireAdmin, (req, resp, next) => {
    const { menuId } = req.params;
    menuSchema
      .remove({ _id: menuId })
      .then((data) => resp.json(data))
      .catch((error) => resp.json({ message: error }));
  });

  nextMain();
};
