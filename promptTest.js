var inquirer = require("inquirer");

inquirer.prompt([
{
	type: "input",
	message: "Please enter the item number you would like to buy",
	name: "itemNumber"
},

]).then(function(user) {

	console.log("Answer 1: " + user.itemNumber)
	
	inquirer.prompt([
	{
		type: "input",
		message: "How many items",
		name: "quantity"
	},

	]).then(function(user) {
	
		console.log("Re print Answer 1: " + user.itemNumber)
		console.log("Answer 2: " + user.quantity);
			
	});

});
