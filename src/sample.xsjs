// import the library to get the db name 
$.import("SAPGoatBackoffice", "schema");
var SCHEMALIB = $.SAPGoatBackoffice.schema;

/**
 * update the quantity of the product with productID in the basket of basketID
 **/
function updateQuantityOfProductInBasket(){
    var conn = $.db.getConnection();

    // Oops...
    var query = "UPDATE " + SCHEMALIB.db + ".BASKETCONTENTS SET \"QUANTITY\" = '" + data.quantity + "' WHERE \"BASKETID\"=" + data.basketID + " AND \"PRODUCTID\"= " + data.productID;
    var stmt = conn.prepareStatement(query);
    var rs = stmt.executeUpdate();
    conn.commit();
    
    return rs;
}


/**
 * add a new product in the basket of basketid in the db
 **/
function addProductInBasket(){
    var conn = $.db.getConnection();

    // Oops...
    var query = "INSERT INTO " + SCHEMALIB.db + ".BASKETCONTENTS (BASKETID, PRODUCTID, QUANTITY, PRICETOPAY) VALUES ('" + data.basketID + "', '" + data.product.productid + "', '1', '" + data.product.price + "')";
    var stmt = conn.prepareStatement(query);
    var rs = stmt.executeUpdate();
    conn.commit();
    
    return rs;
}

/**
 * delete the product of productid from the basket of basketid in the db
 **/
function deleteProductFromBasket(){
    var conn = $.db.getConnection();

    // Oops...
    var query = "DELETE FROM " + SCHEMALIB.db + ".BASKETCONTENTS WHERE \"BASKETID\" = '" + data.basketID + "' AND \"PRODUCTID\" = '" + data.productID + "'";
    var stmt = conn.prepareStatement(query);
    var rs = stmt.executeUpdate();
    conn.commit();
    
    return rs;
}

/**
 * create a basket and assign it to the user of userid
 **/
function createBasketForUser(){
    var conn = $.db.getConnection();

    // Oops...
    var query = "INSERT INTO " + SCHEMALIB.db + ".BASKETS (USERID) VALUES(" + data.userid + ")";
    var stmt = conn.prepareStatement(query);
    var rs = stmt.executeUpdate();
    conn.commit();

    // Oops...
    query = "SELECT BASKETID FROM " + SCHEMALIB.db + ".BASKETS WHERE USERID = " + data.userid;
    stmt = conn.prepareStatement(query);
    rs = stmt.executeQuery();
    var basketidCreated;
    
    if (rs.next()){
    	basketidCreated = rs.getDouble(1);
    }
    
    // Oops...
    query = "UPDATE " + SCHEMALIB.db + ".BODGEITUSERS SET CURRENTBASKETID = " + basketidCreated + " WHERE USERID = " + data.userid;
    stmt = conn.prepareStatement(query);
    rs = stmt.executeUpdate();
    conn.commit();
    
    return rs;
}


var result = 0;
var cmd = $.request.parameters.get('cmd');
var data = JSON.parse($.request.parameters.get('data'));

switch (cmd){
    case "add":
        result = addProductInBasket();
        break;
    case "update":
        result = updateQuantityOfProductInBasket();
        break;
    case "delete":
        result = deleteProductFromBasket();
        break;
    case "create":
        result = createBasketForUser();
        break;
    default:
        break;
}

//debug
$.response.setBody(result);
