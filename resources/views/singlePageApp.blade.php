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
        <div class="toMail" style="display: none"></div>
        <!-- A link to go to the index by changing the hash -->
        <a href="#" class="button">Go to index</a>
    </div>

    <!-- The login page -->
    <div class="page login"></div>

    <!-- The products page -->
    <div class="page products">
        <table border="1" class="list"></table>
        <div class="buttons"></div>
    </div>

    <div class="page product"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <script src="{{ asset('scripts/translateWords.js') }}"></script>
    <script src="{{ asset('scripts/render.js') }}"></script>
    <script src="{{ asset('scripts/route.js') }}"></script>
    <script src="{{ asset('scripts/formAddDeleteToCart.js') }}"></script>
    <script src="{{ asset('scripts/updateQuantity.js') }}"></script>
    <script src="{{ asset('scripts/checkout.js') }}"></script>
    <script src="{{ asset('scripts/login.js') }}"></script>
    <script src="{{ asset('scripts/logout.js') }}"></script>
    <script src="{{ asset('scripts/deleteProduct.js') }}"></script>
    <script src="{{ asset('scripts/addEditProduct.js') }}"></script>

</body>

</html>
