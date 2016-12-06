 var inquirer = require("inquirer");
 var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : '',  
  database : 'greatbay_db'  
});  
connection.connect();  


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


/*function bidItem() {
  var arryChoices = [];
  connection.query("SELECT * FROM items;", function(err, rows, fields) {
      if (err) throw err;
      for (var i = 0; i < rows.length; i++) {
        console.log(rows[i].name + " " + rows[i].type + " " + rows[i].minbid)
        arryChoices.push(rows[i].name);
      }
  });
  inquirer.prompt([
    {
      name: "type",
      type: "list",
      message: "Which item do you want to bid on?",
      choices: ["Item", "Task", "Job", "Project"]
      choices: arryChoices
    },
    {
      name: "bid",
      type: "input",
      message: "How much do you want to bid?"
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
}*/

function postItem() {
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "What item do you want to post?" + answers.item
    },
    {
      name: "type",
      type: "list",
      message: "What type of " + answers.item+" is it?",
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
