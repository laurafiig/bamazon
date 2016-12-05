//require statements - sql, cli tables, inquirer
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
//console.log("connected as id " + connection.threadId);
});

//starts here
inquirer.prompt([
//do you want to shop
{
	type: "confirm",
	message: "Welcome to BAMAZON!  Do you want to make a purchase today?",
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
			//next prompt - ask the item number
			inquirer.prompt([
			{
				type: "input",
				message: "Please enter the item number you would like to buy",
				name: "itemNumber"
			},
			//store the answer
			]).then(function(user) {
			//check if valid item number
			if (user.itemNumber > 0 && user.itemNumber<=response.length ) {
				//put the item number in a variable
				var itemNumber = user.itemNumber-1
				//console.log("#"+itemNumber)
				//next prompt - ask the quantity
				inquirer.prompt([
				{
					type: "input",
					message: "How many item " + user.itemNumber + ": " + response[user.itemNumber-1].product_name + " do you want?",
					name: "quantity"
				},
				//store the answer
				]).then(function(user) {
					//check for available quantity
					if (user.quantity <= response[itemNumber].stock_qty){
						//log the total cost
						console.log("Your cost will be $" + (user.quantity*response[itemNumber].price).toFixed(2));
						//subtract from database
						//?????
						//update
							var newQty = response[itemNumber].stock_qty-user.quantity
							connection.query("UPDATE products SET ? WHERE ?", [{
							  stock_qty: newQty
							}, {
							  item_id: itemNumber+1
							}], function(err, res) {});
						connection.end();						
					} else {
						console.log("Sorry we don't have that many!!")
						connection.end();
					}

				});
			} else {
				console.log("Sorry we don't carry that!!")
				connection.end();
			}
			});
		});
		
	}
	// If the user does not confirm, then a message is provided and the program quits.
	else {
		console.log("Goodbye");
		//done!!
		connection.end();
	}
});


