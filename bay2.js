/////////////////////////////////
var inquirer = require("inquirer");
var mysql      = require('mysql');  
////////////////////////////////
var connection = mysql.createConnection({  
host     : 'localhost',  
user     : 'root',  
password : '',  
database : 'greatbay_db'  
});  
connection.connect();  
///////////////////////////////////////
inquirer.prompt([
{
  name: "activity",
  type: "list",
  message: "What do you want to do?",
  choices: ["POST AN ITEM", "BID ON AN ITEM"]
}
]).then(function(answers) {
  switch (answers.activity) {
    case "POST AN ITEM":
      postItem();
      break;
    case "BID ON AN ITEM":
      bidItem();
      break;
  }
});
////////////////////////////////////////
function postItem() {
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "What item do you want to post?"
    },
    {
      name: "type",
      type: "list",
      message: "What type of item is it?",
      choices: ["Item", "Task", "Job", "Project"]
    },
    {
      name: "minbid",
      type: "input",
      message: "What is the minimum bid allowed?"
    }
  ]).then(function(answers) {
    var item = answers.item;
    var type = answers.type;
    var minBid = answers.minbid;
    console.log(item + " " + type + " " + minBid);
    connection.query("INSERT INTO items (name, type, minbid) VALUES (?, ?, ?)", [item, type, minBid], function(err, rows, fields) {
    if (err) throw err;
    });
    console.log("next is confirm prompt");
    inquirer.prompt([
      {
        name: "continue",
        type: "confirm",
        message: "Do you want to post another item?"
      }
    ]).then(function(confirm) {
      if (confirm.continue) {
        postItem();
      } else {
        inquirer.prompt([
          {
            name: "continue",
            type: "confirm",
            message: "Do you want to bid on an item?"
          }
        ]).then(function(bid) {
          if (bid.continue) {
            bidItem();
          } else {
            connection.end();
          }
        });
      }
    });
  });
}
