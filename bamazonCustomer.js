//require statements - sql, cli tables, inquirer
var mysql = require("mysql");
var Table = require('cli-table');
var inquirer = require("inquirer");
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
  //console.log("connected as id " + connection.threadId);
});



//starts here
inquirer.prompt([
  //do you want to shop
  {
    type: "confirm",
    message: "Do you want to make a purchase today?",
    name: "confirm",
    default: true
  },
//store the answer
]).then(function(user) {
  // If the user confirms, we take the order.
  if (user.confirm) {
  //showTable()
  
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
    

  //console.log("Welcome to BAMAZON!!!")
  //next prompt - ask the item number
  inquirer.prompt([
  {
    type: "input",
    message: "Please enter the item number you would like to buy",
    name: "itemNumber"
  },
  //store the answer
  ]).then(function(user) {
    //check if valid number
    //*****fix for later - check against database
    if (user.itemNumber > 0 && user.itemNumber<12 ) {
    //placeholder for inventory check
    console.log("You want item number: " + user.itemNumber);
    console.log("Print item description from database here");
    //next prompt - ask the quantity
    inquirer.prompt([
    {
    type: "input",
    message: "How many do you want?",
    name: "quantity"
    },
    //store the answer
    ]).then(function(user) {
    //placeholder for database functions
    console.log("You want qty: " + user.quantity);
    console.log("That will be one biiilllliiiooonnn dollars....");
    connection.end();
    });
} else {
  console.log("Sorry we don't carry that!!")
  connection.end();
}
});
  });
// If the user does not confirm, then a message is provided and the program quits.
  }
  else {
    console.log("Goodbye");
    //done!!
connection.end();
  }
});


