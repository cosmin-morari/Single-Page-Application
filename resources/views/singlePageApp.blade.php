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

<!-- Custom JS script -->
<script type="text/javascript">
let translations = {!! json_encode(__('messages')) !!};
</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="{{ asset('scripts/render.js') }}"></script>
<script src="{{ asset('scripts/formAddDeleteToCart.js') }}"></script>
<script src="{{ asset('scripts/updateQuantity.js') }}"></script>
<script src="{{ asset('scripts/checkOut.js') }}"></script>
<script src="{{ asset('scripts/route.js') }}"></script>

</body>
</html>
