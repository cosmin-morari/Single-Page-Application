@extends('layouts.app')
@section('title', trans('messages.order'))

@section('content')

    <div class="content">
        <h1>{{ trans('messages.order') }}</h1>
        <table style="text-align: center;" border="1">
            <thead>
                <tr>
                    <th>{{ trans('messages.image') }}</th>
                    <th>{{ trans('messages.name') }}</th>
                    <th>{{ trans('messages.yourQuantity') }}</th>
                    <th>{{ trans('messages.totalPrice') }}</th>
                </tr>

            </thead>

            @foreach ($order->products as $product)
                <tbody>
                    <td><img src="{{ asset('storage/photos/' . $product->imageSource) }}" alt=""></td>
                    <td>{{ $product->title }}</td>
                    <td>{{ $product->pivot->quantity }}</td>
                    <td>{{ $product->pivot->quantity * $product->pivot->checkout_price }}</td>
                </tbody>
            @endforeach
        </table>
        <a href="{{ route('orders') }}">{{ trans('messages.ordersPage') }}</a>
    </div>

@endsection
