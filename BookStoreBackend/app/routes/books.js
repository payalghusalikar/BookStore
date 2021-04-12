/**
 * @module      routes
 * @file         book.js
 * @description  provide the routes for user as well note operations
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        05/04/2021  
-----------------------------------------------------------------------------------------------*/

var helper = require("../../middleware/helper.js");
const book = require("../controllers/book.js");

module.exports = (app) => {
console.log("book route");
    // app.post('/book', helper.verifyRole,  function(req, res){
    //     book.addBook
    //   }); 
      app.post('/book', helper.verifyRole, 
        book.addBook
      ); 
 // get books
 app.get('/books', helper.verifyToken, book.findAllBooks);

};