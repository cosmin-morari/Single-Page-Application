@extends('layouts.app')
@section('title', trans('messages.productsPage'))
@section('content')
    <div class="container">
        <h1>{{ trans('messages.productsPage') }}</h1>
        @foreach ($allProducts as $product)
            <div class="content">
                <form action="{{ route('deleteProduct', [$product->id]) }}" method="POST">
                    @csrf
                    <div class="img">
                        <img src="{{ asset('storage/photos/' . $product->imageSource) }}" alt="">
                    </div>
                    <div class="details">
                        <p>{{ trans('messages.title') }}:{{ $product->title }}</p>
                        <p>{{ trans('messages.description') }}:{{ $product->description }}</p>
                        <p>{{ trans('messages.price') }}:{{ $product->price }}</p>
                    </div>
                    <div class="buttons">
                        <a href={{ route('editProductView', [$product->id]) }}>{{ trans('messages.edit') }}</a>
                        <input type="submit" class="deleteProducts" name="delete" value="{{ trans('messages.delete') }}">
                    </div>
                </form>
            </div>
        @endforeach
        <div class="buttons">
            <a href="{{ route('addProduct') }}">{{ trans('messages.addProduct') }}</a>
            <form action= "{{ route('logoutAdmin') }}" method="POST">
                @csrf
                <input type="submit" class="logout" name="logout" value="{{ trans('messages.logout') }}">
            </form>
        </div>
        <br>
        <br>
        <a href="{{ route('orders') }}">{{ trans('messages.ordersPage') }}</a>
    </div>

@endsection
