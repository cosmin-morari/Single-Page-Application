@extends('layouts.app')
@section('title', trans('messages.productPage'))

@section('content')

    <div class="container">
        <h3>{{ trans('messages.productPage') }}</h3>
        <form action="{{ $destination == 'addProduct' ? route('addProduct') : route('update', [$product->id]) }}"
            method="POST" enctype="multipart/form-data">
            @if ($destination == 'editProduct')
                @method('PATCH')
            @endif
            @csrf
            <input type="text" name="title" placeholder="{{ trans('messages.title') }} "
                value="{{ $destination == 'addProduct' ? old('title') : $product->title }}">
            @error('title')
                <p style="color:red;">{{ $message }}</p>
            @enderror
            <br>
            <br>
            <input type="text" name="description" placeholder="{{ trans('messages.description') }} "
                value="{{ $destination == 'addProduct' ? old('description') : $product->description }}">
            @error('description')
                <p style="color:red;">{{ $message }}</p>
            @enderror
            <br>
            <br>
            <input type="text" name="price" placeholder="{{ trans('messages.price') }} "
                value="{{ $destination == 'addProduct' ? old('price') : $product->price }}">
            @error('price')
                <p style="color:red;">{{ $message }}</p>
            @enderror
            <br>
            <br>
            <input type="file" name="image" id="file" class="inputFile">
            @error('image')
                <p style="color:red;">{{ $message }}</p>
            @enderror
            <br>
            <br>
            <a href="{{ route('products') }}">{{ trans('messages.productsPage') }}</a>
            <input type="submit" name="save" value="{{ trans('messages.save') }}">
        </form>
    </div>

@endsection
