const mysql = require('mysql')
const config = require('./config.js')

const connection = mysql.createPool(config)

class ConnectionFunctions {
  static connect () {
    connection.getConnection((err) => {
      if (err) throw err
    })
  }

  static close () {
    connection.end()
  }

  // GET all customers
  static getCustomers () {
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.query('SELECT * FROM customers', (err, customers) => {
          if (err) throw (err)
          resolve(customers)
        })
      } else {
        reject(Error)
      }
    })
  }

  // GET all products
  static getProducts () {
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.query(`SELECT name, product_name, product_description, product_price
                          FROM products
                          INNER JOIN suppliers
                          ON product_id = suppliers.supplier_id`, (err, products) => {
          if (err) throw (err)
          resolve(products)
        })
      } else {
        reject(Error)
      }
    })
  }

  // GET all suppliers
  static getSuppliers () {
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.query('SELECT name, phone, email FROM suppliers', (err, suppliers) => {
          if (err) throw (err)
          resolve(suppliers)
        })
      } else {
        reject(Error)
      }
    })
  }

  // Add customer to DB
  static saveCustomer (firstName, lastName, streetAddress, city, postcode, phone, email, password) {
    return new Promise((resolve, reject) => {
      if (connection) {
        const sql = `INSERT INTO customers (first_name, last_name, street_address, city, postcode, phone, email, password)
                     VALUES(${connection.escape(firstName)},
                            ${connection.escape(lastName)}, 
                            ${connection.escape(streetAddress)}, 
                            ${connection.escape(city)}, 
                            ${connection.escape(postcode)}, 
                            ${connection.escape(phone)}, 
                            ${connection.escape(email)}, 
                            ${connection.escape(password)})`
        connection.query(sql, (err, customer) => {
          if (err) throw (err)
          resolve(`Added customer ${firstName} ${lastName} to database`)
        })
      } else {
        reject(Error)
      }
    })
  }

  // Add supplier to DB
  static saveSupplier (name, supplierDescription, streetAddress, city, postcode, phone, email, password) {
    return new Promise((resolve, reject) => {
      if (connection) {
        const sql = `INSERT INTO suppliers (${connection.escape(name)},
                                            ${connection.escape(supplierDescription)},
                                            ${connection.escape(streetAddress)}, 
                                            ${connection.escape(city)}, 
                                            ${connection.escape(postcode)}, 
                                            ${connection.escape(phone)}, 
                                            ${connection.escape(email)}, 
                                            ${connection.escape(password)})`
        connection.query(sql, (err, supplier) => {
          if (err) throw (err)
          resolve(`Added ${supplier} to database`)
        })
      } else {
        reject(Error)
      }
    })
  }

  // Add product to DB
  static saveProduct (productName, productDescription, productPrice) {
    return new Promise((resolve, reject) => {
      if (connection) {
        const sql = `INSERT INTO products (${connection.escape(productName)},
                                           ${connection.escape(productDescription)}, 
                                           ${connection.escape(productPrice)})`
        connection.query(sql, (err, product) => {
          if (err) throw (err)
          resolve(`Added ${product} to database`)
        })
      } else {
        reject(Error)
      }
    })
  }
}

module.exports = ConnectionFunctions

// curl -X POST 'first_name=Pekka&last_name=PEKKA&street_address=koti&city=TAMPERE&postcode=33310&phone=23124145&email=asda@dd.häh' localhost:8080/api/customers

/*
curl -i -X POST -d "{"first_name": "Jukka", "last_name": "Kukkula", "street_address": "Sukkatie 5", "city": "Tampere", "postcode": "33100", "phone": "05066666618", "email": "jukansukka@gmail.com", "password": "sukka123"}" -H "Content-type:application/json"
*/
