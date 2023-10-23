@extends('layouts.app')
@section('title', trans('messages.index'))


@section('content')
    <div class="container">
        <h1>{{ trans('messages.index') }}</h1>
        @error('quantity')
            <p style="color:red;">{{ $message }}</p>
        @enderror
        @foreach ($allProducts as $product)
            <div class="content">
                <form action="{{ route('addToCart', [$product->id]) }}" method="POST">
                    @csrf
                    <div class="img">
                        <img src="{{ asset('storage/photos/' . $product->imageSource) }}" alt="">
                    </div>
                    <div class="details">
                        <p>{{ trans('messages.title') }}:{{ $product->title }}</p>
                        <p>{{ trans('messages.description') }}:{{ $product->description }}</p>
                        <p>{{ trans('messages.price') }}:{{ $product->price }}</p>
                    </div>
                    <div class="addToCart">
                        <button type="submit" class="addToCartBtn">{{ trans('messages.add') }}</button>
                    </div>
                </form>
            </div>
        @endforeach
        <div class="links">
            <a href="{{ route('cart') }}">{{ trans('messages.cart') }}</a>
        </div>
    </div>
@endsection
