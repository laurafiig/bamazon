var inquirer = require("inquirer");

inquirer.prompt([
{
	type: "input",
	message: "Please enter the item number you would like to buy",
	name: "itemNumber"
},
{
	type: "input",
	message: "How many items",
	name: "quantity"
},

]).then(function(user) {

	if (user.itemNumber != 5) {
		console.log("Wrong number")
	} else if (user.quantity != 5) {
		console.log("Wrong quantity")
	} else {
		console.log("Answer 1: " + user.itemNumber);
		console.log("Answer 2: " + user.quantity);
	}
			
});


