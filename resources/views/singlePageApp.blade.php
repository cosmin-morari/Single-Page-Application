<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ trans('messages.index') }}</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>

<body>
    <!-- The index page -->
    <div class="page index">
        <!-- The index element where the products list is rendered -->
        <table border="1" class="list"></table>
        <!-- A link to go to the cart by changing the hash -->
        <a href="#cart" class="button">Go to cart</a>
    </div>

    <!-- The cart page -->
    <div class="page cart">
        <!-- The cart element where the products list is rendered -->
        <table border="1" class="list tableProducts"></table>
        <div class="toMail" style="display: none">
            <form action="checkout" class="checkOut" method="POST">

                <input type="text" name="name" placeholder="{{ trans('messages.name') }}"
                    value="{{ old('name') }}">
                @error('name')
                    <p style="color:red;">{{ $message }}</p>
                @enderror
                <input type="text" name="contactDetails" placeholder="{{ trans('messages.contactDetails') }}"
                    value="{{ old('contactDetails') }}">
                @error('contactDetails')
                    <p style="color:red;">{{ $message }}</p>
                @enderror
                <textarea name="comments" placeholder="{{ trans('messages.comments') }}" cols="20" rows="4"> {{ old('comments') }}</textarea>
                @error('comments')
                    <p style="color:red;">{{ $message }}</p>
                @enderror
                <button type="submit" class="RemoveBtn">{{ trans('messages.checkout') }}</button>
            </form>
        </div>
        <!-- A link to go to the index by changing the hash -->
        <a href="#" class="button">Go to index</a>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="{{ asset('scripts/formAddDeleteToCart.js') }}"></script>
    <script src="{{ asset('scripts/updateQuantity.js') }}"></script>
    <script src="{{ asset('scripts/checkOut.js') }}"></script>

<!-- Custom JS script -->
<script type="text/javascript">
    $(document).ready(function() {

        function renderList(products) {
            html = [
                `<tr>,
                <th>{{ trans('messages.image') }}</th>
                <th>{{ trans('messages.title') }}</th>
                <th>{{ trans('messages.description') }}</th>
                <th>{{ trans('messages.price') }}</th>
                ${(()=>{
                        if(window.location.hash == '#cart'){
                            return `<th>{{ trans('messages.yourQuantity') }}</th>`
                        }
                })()}
                <th>{{ trans('messages.action') }}</th>
                </tr>  `
            ].join('');

            $.each(products, function(key, product) {

                let url = window.location.hash == '#cart' ? '{{ route('cartCheckout', ':id') }}' : '{{ route('addToCart', ':id') }}';
                url = url.replace(':id', product.id);
                let formAddDeleteToCartRoute = window.location.hash == '#cart' ? `cartCheckout/${product.id}` : `addToCart/${product.id}`;
                html += [
                    `<tr>
                    <td><img src="{{ asset('storage/photos/') }}/${product.imageSource}"></td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    ${(()=>{
                        if(window.location.hash == '#cart'){
                            return `<td>
                                        <form action="cartCheckout/${product.id}" method="POST" class="updateQuantity">
                                            <input type="number" name="setQuantity" class="quantity" id="${product.id}" value="${product.quantity[key][product.id]}">
                                            <button type="submit" name="setQuantity">{{ trans('messages.update') }}</button>
                                        </form>
                                    </td>`
                        }
                })()}
                    <td>
                        <form action ="${formAddDeleteToCartRoute}" method="POST" class="formAddDeleteToCart">
                            ${(()=>{
                                if(window.location.hash == '#cart'){
                                    return `<button name="delete" type="submit" class="addToCartBtn">{{ trans('messages.delete') }}</button>`
                                }else{
                                    return `<button type="submit" class="addToCartBtn">{{ trans('messages.add') }}</button>`
                                }
                            })()}
                        </form>
                    </td>`
                ].join('');
            });

            return html;
        }

    /**
     * URL hash change handler
     */

    window.onhashchange = function() {
        // First hide all the pages
        $('.page').hide();
        switch (window.location.hash) {
            case '#cart':
                // Show the cart page
                $('.cart').show();
                // Load the cart products from the server
                $.ajax({
                    url: "{{ route('cart') }}",
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
                    url: "{{ route('index') }}",
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'accepts': 'application/json'
                    },
                    success: function(response) {
                        console.log(response)
                        // Render the products in the index list
                        $('.index .list').html(renderList(response));
                    }
                });
                break;
        }
    }
    window.onhashchange();
    })
</script>
</body>
</html>
