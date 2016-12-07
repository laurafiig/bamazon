# BAMAZON

Order and inventory app using Node.js and SQL

bamazonCustomer.js allows a user to make a purchase from inventory.

bamazonManager.js allows a user to see all inventory, check for low inventory, re-stock products, or add new products 

On heroku at: https://fierce-taiga-38693.herokuapp.com/


## bamazonCustomer.js

Initial load and purchase prompt:

![initial](/screenshots/customer1.png)

When purchase confirmed, item number and quantity entered, then total cost is calculated, updated table is generated, and user is promted for a new purchase.  (*after screencap I added some spacing around the total to improve the look*)

![initial](/screenshots/customer2.png)

When an incorrect item number is entered, an error message is generated and the user is returned to the purchase prompt

![initial](/screenshots/customer3.png)

When a too high quantity is entered, an insufficient stock message is generated and the user is returned to the purchase prompt

![initial](/screenshots/customer4.png)

If no further purchase is desired, the program exits.

## bamazonManager.js

Initial load and options prompt:  (*returns to options prompt after each request is performed*)

![initial](/screenshots/manager1.png)

When see all inventory is chosen:

![initial](/screenshots/manager2.png)

When check for low inventory is chosen:

![initial](/screenshots/manager3.png)

When re-stock products is chosen:

![initial](/screenshots/manager4.png)

When see add new products is chosen:

![initial](/screenshots/manager5.png)

See all inventory one more time to show changes:

![initial](/screenshots/manager6.png)

If no further purchase is desired, the program exits.