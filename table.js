var table = new Table({
        head: ['Item Name', 'Item Type', 'Starting Bid']
      , colWidths: [20, 20, 20]
    });
    connection.query("SELECT * FROM bidiottable", function(error, response){
        if (error) throw error;
        console.log(response.length);
        for(var i =0; i<response.length;i++){
            table.push([response[i].itemname, response[i].itemtype, response[i].itembid]);
        }
        console.log(table.toString());
    });