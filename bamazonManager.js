// Load 
var mysql = require("mysql");
var Table = require('cli-table');
var inquirer = require("inquirer");

// connect
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
});

// View Products for Sale
function viewProducts() {
  //create table variable
  var table = new Table({
    head: ['ID', 'Product Name', 'Department', 'Price', 'Qty.']
    , colWidths: [5, 25, 15, 10, 10]
  });
  // read from database
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
    // push data to table
    for(var i =0; i<response.length; i++){
      table.push([response[i].item_id, response[i].product_name, response[i].department, response[i].price, response[i].stock_qty]);
    }
    // print table
    console.log(table.toString());  
    // continue program with new choice
    makeChoice();
  });
}

//View Low Inventory
function lowInventory() {
  var table = new Table({
    head: ['ID', 'Product Name', 'Department', 'Price', 'Qty.']
    , colWidths: [5, 25, 15, 10, 10]
  });
  //read from database
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
    //push data to table
    for(var i =0; i<response.length; i++){
      if (response[i].stock_qty < 5){
        table.push([response[i].item_id, response[i].product_name, response[i].department, response[i].price, response[i].stock_qty]);
      }
    }
    console.log(table.toString());  
    //continue program with new choice
    makeChoice();
  });
}

//Add to Inventory
function addInventory() {
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "Which item would you like to restock?"
    },
    {
      name: "stock_qty",
      type: "input",
      message: "How many would you like to add to stock?"
    }
  ]).then(function(answers) {
      //read from database
      connection.query("SELECT * FROM products WHERE ?", [{
        item_id: answers.item_id
      }], function(err, response) {
      if (err) throw err;
      var itemID = answers.item_id
      var newQty = parseInt(response[0].stock_qty) + parseInt(answers.stock_qty)
        connection.query("UPDATE products SET ? WHERE ?", [{
        stock_qty: newQty
        }, {
        item_id: itemID
        }], function(err, rows, fields) {
          if (err) throw err;
          //continue program with new choice
          makeChoice();
        });
      });
  });
}

//Add New Product
function addProduct() {
  inquirer.prompt([
    {
      name: "product_name",
      type: "input",
      message: "Enter item description:"
    },
    {
      name: "department",
      type: "input",
      message: "What department does it belong in?",
    },
    {
      name: "price",
      type: "input",
      message: "What is the item's price?"
    },
    {
      name: "stock_qty",
      type: "input",
      message: "How many would you like to stock?"
    }
  ]).then(function(answers) {
    connection.query("INSERT INTO products (product_name, department, price, stock_qty) VALUES (?, ?, ?, ?)", [answers.product_name,answers.department,answers.price,answers.stock_qty], function(err, rows, fields) {
      if (err) throw err;
      //continue program with new choice
    makeChoice();
      });
  });
}

//function selection
function makeChoice() {
  // Create a prompt 
  inquirer.prompt([
  {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "I'm Finished"]
  },
  ]).then(function(user) {
    switch (user.choice) {
      case "View Products for Sale":
        viewProducts();
        break;
      case "View Low Inventory":
        lowInventory();
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        addProduct();
        break;
      case "I'm Finished":
        connection.end()
        break;  
    }
  });
}

//call function to start program
makeChoice()  