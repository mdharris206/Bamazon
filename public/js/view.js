$(document).ready(function() {
  // Products into product container
  var $productsContainer = $(".products-container");
  // Adding event listeners for validating inventory and buying item

  $(document).on("click", ".buy-button", buyProduct);

  function buyProduct() {
    const buyId = $(this).attr("data-id");
    const buyQty = parseInt(
      $(`#inputQty${buyId}`)
        .val()
        .trim()
    );
    const availableQty = parseInt($(`#availableQty${buyId}`).attr("data-qty"));

    console.log(this);
    console.log("Id: ", buyId);
    console.log("buyQty: ", buyQty);
    console.log("availableQty: ", availableQty);

    if (buyQty > availableQty) {
      alert("Insufficient Quantity");
      console.log("Insufficient Quantity");
    } else {
      const buyObj = { stock_quantity: availableQty - buyQty };
      console.log(buyObj);
      $.ajax({
        method: "PUT",
        url: `/api/product/${buyId}`,
        data: buyObj
    }).then(function(data) {
        // This function creates modal for checkout.
        let totalCost = buyQty * data.price;
        const checkoutModal = `
            <!-- Modal content-->
            <div class="modal-content">
            <div class="modal-header" style="padding:35px 50px;">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4><span class="glyphicon glyphicon-lock"></span> Login</h4>
              </div>
              <div class="modal-body" style="padding:40px 50px;">
              <form role="form">
              <div class="form-group">
              <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
              <input type="text" class="form-control" id="usrname" placeholder="Enter email">
              </div>
              <div class="form-group">
              <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
              <input type="text" class="form-control" id="psw" placeholder="Enter password">
              </div>
              <div class="checkbox">
              <label><input type="checkbox" value="" checked>Remember me</label>
              </div>
              <button type="submit" class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span> Login</button>
              </form>
              </div>
              <div class="modal-footer">
              <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
              <p>Not a member? <a href="#">Sign Up</a></p>
              <p>Forgot <a href="#">Password?</a></p>
              </div>
              </div>
            </div>`;

        $("#myModal").append(checkoutModal);
        $("#myModal").modal();
        /*Here I want to retrieve qty info from correlated item in database
    
    Once I have this I will do a logic test to see if input qty is less than or 
    equal to qty in database. 
    
    If not I will give error to user for insufficient quantity
    
    If so I will subtract input value from database qty. I will update database 
    I will prompt user for checkout. 
    
    */
      });
    }
    location.reload();
  }

  // Our initial products array
  var products = [];

  function getProducts() {
    $.get("/api/products").then(function(response) {
      renderProducts(response);
    });
  }

  // Getting products from database when page loads
  getProducts();

  function renderProducts(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const product = `
            <div class="card">
            <div class="card-body">
          <img
            id="productpic"
            src="https://acacia-wood.com/themes/jtherczeg-multi//assets/images/acacia/empty-img.png"
            class="card-img-top"
            height="300"
            width="300"
            alt="..."
            />
            <h5 class="card-title">${data[i].product_name}</h5>
            <p class="card-text">
            A description of the product.
            </p>
            <p id="availableQty${data[i].id}" data-qty=${
        data[i].stock_quantity
      }>Available Quantity: ${data[i].stock_quantity}</p>
            <div class="form-group col-md-1" id="qtyInput">
            <label for="inputQty">${data[i].product_name}</label>
            <input type="text" class="form-control" id="inputQty${
              data[i].id
            }" value="" placeholder="Enter desired quantity."/>
            <button class="btn btn-primary buy-button" data-id=${
              data[i].id
            }>Buy Now</button>
            </div>
            </div>
            </div>
            </div>
            `;
      $("#product-list").append(product);
    }
  }
});
