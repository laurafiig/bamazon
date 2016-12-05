// Load 
var mysql = require("mysql");
var Table = require('cli-table');
var inquirer = require("inquirer");


//connect
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "Mellon11",
database: "bamazon"
});
connection.connect(function(err) {
if (err) throw err;
console.log("connected as id " + connection.threadId);
});


// Create a "Prompt" with a series of questions.
inquirer.prompt([
// Here we create a  prompt.
{
type: "list",
message: "What would you like to do?",
name: "choice",
choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
},
]).then(function(user) {
console.log("you chose:" + user.choice)


switch (user.choice) {
case "View Products for Sale":
console.log("you want to: " + "View Products for Sale");


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
connection.end();
break;


case "View Low Inventory":
console.log("you want to: " + "View Low Inventory");


//create table variable
var table = new Table({
head: ['ID', 'Product Name', 'Department', 'Price', 'Qty.']
, colWidths: [5, 25, 15, 10, 10]
});
//read from database
connection.query("SELECT * FROM products WHERE ?", [{
    stock_qty: 457
  }],function(err, response) {
if (err) throw err;
//push data to table
for(var i =0; i<response.length; i++){
table.push([response[i].item_id, response[i].product_name, response[i].department, response[i].price, response[i].stock_qty]);
}
//print table
console.log(table.toString());  
});
connection.end();

break;


case "Add to Inventory":
console.log("you want to: " + "Add to Inventory");
break;

case "Add New Product":
console.log("you want to: " + "Add New Product");
break;
}

});