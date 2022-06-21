const seedOrder = [
  {
    client: 'Maggie',
    table: '9',
    total: '22.00',
    status: 'process',
    hours: '11:27:53',
    startTime: 1653323273796,
    endTime: 1653324513486,
    totalTime: 21,
    products: [
      {
        name: 'Sandwich',
        price: 15,
        popularity: 4.8,
        image: 'https://eggs.org.nz/wp-content/uploads/2021/12/Club-Sandwiches-500x500.jpg',
      },
      {
        name: 'Cafe',
        price: 7,
        popularity: 5,
        image: 'https://ae01.alicdn.com/kf/H1c2054b527494e9faee9a11dfd37572bi.jpg',
      },
    ],
  },
  {
    client: 'Ramon',
    table: '3',
    total: '25.00',
    status: 'ready',
    hours: '11:27:53',
    startTime: 1653323273796,
    endTime: 1653324181447,
    totalTime: 15,
    products: [
      {
        name: 'Refresco 1L',
        price: 10,
        popularity: 4,
        image: 'https://superlomas.odoo.com/web/image/product.template/3087/image_256/REFRESCO%20COCA%20COLA%20PET%20NR%201%20LT?unique=af1926f',
      },
      {
        name: 'Hamburguesa Doble',
        price: 15,
        popularity: 5,
        image: 'https://cdn.shopify.com/s/files/1/0248/7310/7536/products/haz-keto-bollos-para-hamburguesa-3_1200x1200.jpg?v=1623868484',
      },
    ],
  },
  {
    client: 'Laila',
    table: '2',
    total: '20.00',
    status: 'delivered',
    hours: '11:46:59',
    startTime: 1653324419936,
    endTime: 1653325338812,
    totalTime: 15,
    products: [
      {
        name: 'Hamburguesa Simple',
        price: 10,
        popularity: 4,
        image: 'https://elporxosantmarti.com/wp-content/uploads/2021/12/hamburguesa-anos-20.jpg',
      },
      {
        name: 'Refresco 1L',
        price: 10,
        popularity: 4,
        image: 'https://superlomas.odoo.com/web/image/product.template/3087/image_256/REFRESCO%20COCA%20COLA%20PET%20NR%201%20LT?unique=af1926f',
      },
    ],
  },
];

module.exports = seedOrder;
