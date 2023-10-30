window.onhashchange = function() {
    // First hide all the pages
    $('.page').hide();
    switch (window.location.hash) {
        case '#cart':
            // Show the cart page
            $('.cart').show();
            // Load the cart products from the server
            $.ajax({
                url: "/cart",
                type: 'GET',
                dataType: 'json',
                headers: {
                    'accepts': 'application/json'
                },
                success: function(response) {
                    // Render the products in the cart list
                    $('.cart .list').html(renderList(response));
                    $('.toMail').show();
                    $('.tableProducts').show();
                }
            });
            break;
        default:
            // If all else fails, always default to index
            // Show the index page
            $('.index').show();
            // Load the index products from the server
            $.ajax({
                url: "/",
                type: 'GET',
                dataType: 'json',
                headers: {
                    'accepts': 'application/json'
                },
                success: function(response) {
                    // Render the products in the index list
                    $('.index .list').html(renderList(response));
                }
            });
            break;
    }
}

window.onhashchange();