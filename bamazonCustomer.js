//require statements - sql, cli tables, inquirer
var mysql = require("mysql");
var Table = require('cli-table');
var inquirer = require("inquirer");

//connect
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

////////////////////////////////////////////////////////////

function table() {
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
		purchase(response)
	});	// end .query SELECT
}	// end table


function purchase(response) {
	//confirm purchase
	inquirer.prompt([
	//do you want to shop
	{
		type: "confirm",
		message: "Would you like to make a purchase?",
		name: "confirm",
		default: true
	},
	//store the answer
	]).then(function(user) {
		// If the user confirms, we take the order.
		if (user.confirm) {
			item(response)
		}
		// If the user does not confirm, then a message is provided and the program quits.
		else {
			console.log("Goodbye");
			//done!!
			connection.end();
		}
	});
}


function item(response) {
	//next prompt - ask the item number
	inquirer.prompt([
	{
		type: "input",
		message: "Please enter the item number you would like to purchase:",
		name: "itemNumber"
	},
	//store the answer
	]).then(function(user) {
	//check if valid item number
	if (user.itemNumber > 0 && user.itemNumber<=response.length ) {
		//put the item number in a variable
		var itemNumber = user.itemNumber-1
		//console.log("#"+itemNumber)
		qty(user, response, itemNumber)
	} else {
		console.log("")
		console.log("")
		console.log("Sorry we don't carry that!! Please make another choice.")
		table();
		console.log("")
		console.log("")
	}
	});
}


function qty(user, response, itemNumber) {
	//next prompt - ask the quantity
	inquirer.prompt([
	{
		type: "input",
		message: "How many "+ response[user.itemNumber-1].product_name + " would you like to purchase?",
		name: "quantity"
	},
	//store the answer
	]).then(function(user) 	{
		//check for available quantity
		if (user.quantity <= response[itemNumber].stock_qty){
			//log the total cost
			console.log("")
			console.log("")								
			console.log("Your cost will be $" + (user.quantity*response[itemNumber].price).toFixed(2));
			console.log("")
			console.log("")								
				//subtract from database
				var newQty = response[itemNumber].stock_qty-user.quantity
				connection.query("UPDATE products SET ? WHERE ?", [{
				  stock_qty: newQty
				}, {
				  item_id: itemNumber+1
				}], function(err, res) {});
			table();						
		} else {
			console.log("")
			console.log("")
			console.log("Sorry we don't have that many!! Please make another choice.")
			console.log("")
			console.log("")
			table();
		}

	});
}


////////////////////////////////////////////////////////////////

//call function to start program
table()

