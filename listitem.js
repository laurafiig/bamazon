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
      });
  connection.end();
  });
}

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
      connection.query("UPDATE products SET ? WHERE ?", [{
      stock_qty: +=answers.stock_qty
      }, {
      item_id: answers.item_id
      }], function(err, rows, fields) {
        if (err) throw err;
      });
  connection.end();
  });
}

//update
 function(err, res) {});