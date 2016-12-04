//require statements - sql, cli tables
var mysql = require("mysql");
var Table = require('cli-table');

//connect
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Mellon11",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

//function to read from database and print in a table
function showTable() {
  //create table variable
  var table = new Table({
    head: ['ID', 'Product Name', 'Department', 'Price', 'Qty.']
    , colWidths: [5, 25, 15, 10, 10]
    });
  //read from database
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
      //push data to table
      for(var i =0; i<response.length; i++){
        table.push([response[i].item_id, response[i].product_name, response[i].department, response[i].price, response[i].stock_qty]);
      }
      //print table
      console.log(table.toString());  
    });
};

showTable()
console.log("Welcome to BAMAZON!!!")
console.log("Would you like to make a purchase today?")

//done!!
connection.end();
