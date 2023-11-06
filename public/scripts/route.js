$(document).ready(function () {
    window.onhashchange = function () {
        // First hide all the pages
        $(".page").hide();
        switch (window.location.hash) {
            case "#cart":
                // Show the cart page
                $(".cart").show();
                // Load the cart products from the server
                $.ajax({
                    url: "/cart",
                    type: "GET",
                    dataType: "json",
                    headers: {
                        accepts: "application/json",
                    },
                    success: function (response) {
                        // Render the products in the cart list
                        $(".cart .list").html(renderList(response));
                        $(".toMail").show();
                        $(".tableProducts").show();
                    },
                });
                break;
            case "#login":
                $(".login").show();
                $.ajax({
                    url: "login",
                    type: "GET",
                    dataType: "json",
                    headers: {
                        accepts: "application/json",
                    },
                    success: function (response) {
                        if (response.sessionAdmin != false) {
                            $(".login").hide();
                            window.location.hash = "#products";
                        }
                        $(".login").html(`
                            <form action="login" method="POST" class="login">
                                <div class="container">
                                    <h3>${window.translation.login}</h3>
                                    <input type="text" name="adminMail" class="adminMail" placeholder="${window.translation.userName}">
                                    <div style="color:red" class="error adminMail"></div>
                                    <br><br>
                                    <input type="password" name="adminPassword" class="adminPassword" placeholder="${window.translation.password}">
                                    <div style="color:red" class="error adminPassword "></div>
                                    <br><br>
                                    <button type="submit">${window.translation.login}</button>
                                </div>
                            </form>
                            `);
                    },
                });
                break;
            case "#products":
                $(".products").show();
                $.ajax({
                    url: "products",
                    type: "GET",
                    dataType: "json",
                    headers: {
                        accepts: "application/json",
                    },
                    success: function (response) {
                        if (response.sessionAdmin == false) {
                            $(".products").hide();
                            window.location.hash = "#login";
                        } else {
                            $(".products .list").html(renderList(response));
                        }
                    },
                });
                break;
            case "#product":
                $(".product").show();
                $.ajax({
                    url: "addProduct",
                    type: "GET",
                    dataType: "json",
                    headers: {
                        accepts: "application/json",
                    },
                    success: function (response) {
                        if (response.sessionAdmin == false) {
                            $(".product").hide();
                            window.location.hash = "#login";
                        } else {
                            $(".product").html(
                                addEditProductTemplate(
                                    null,
                                    response.destination
                                )
                            );
                        }
                    },
                });
                break;
            case "#productEdit":
                $(".productEdit").show();
                break;
            case "#orders":
                $(".orders").show();
                $.ajax({
                    url: "orders",
                    type: "GET",
                    dataType: "json",
                    headers: {
                        accepts: "application/json",
                    },
                    success: function (response) {
                        $(".orders .list").html(renderOrders(response));
                    },
                });
                break;
            case "#order":
                $(".order").show();
                break;

            case "#detailsProduct":
                $(".detailsProduct").show();
                break;
            default:
                // If all else fails, always default to index
                // Show the index page
                $(".index").show();
                // Load the index products from the server
                $.ajax({
                    url: "/",
                    type: "GET",
                    dataType: "json",
                    headers: {
                        accepts: "application/json",
                    },
                    success: function (response) {
                        // Render the products in the index list
                        $(".index .list").html(renderList(response));
                    },
                });
                break;
        }
    };
    window.onhashchange();
});
