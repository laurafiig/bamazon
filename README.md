# bamazon

BAMAZON

order and inventory app  using Node.js and SQL

bamazonCustomer.js allows a user to make a purchase from inventory.

bamazonManager.js allows a user to see all inventory, check for low inventory, re-stock products, or add new products 

https://fierce-taiga-38693.herokuapp.com/


## bamazonCustomer.js

initial load and purchase prompt

![initial](/screenshots/customer1.png)

when purchase confirmed, item number and quantity entered
total cost is calculated, and updated table is generated
*after screencap I added some spacing around the total to improve the look*

![initial](/screenshots/customer2.png)

When an incorrect item number is entered, an error message is generated and the user is returned to the purchase prompt

![initial](/screenshots/customer3.png)

When a too high quantity is entered, an insufficient stock message is generated and the user is returned to the purchase prompt

![initial](/screenshots/customer4.png)

if no further purchase desired, the program exits

## bamazonManager.js
