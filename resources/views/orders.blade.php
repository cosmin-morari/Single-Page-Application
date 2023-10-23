@extends('layouts.app')
@section('title', trans('messages.ordersPage'))


@section('content')

    <div class="content">
        <h1 style="text-align: center">{{ trans('messages.ordersPage') }}</h1>
        @if (isset($data) && count($data))
            <table style="text-align: center" border="1">
                <thead>
                    <tr>
                        <th>{{ trans('messages.id') }}</th>
                        <th>{{ trans('messages.date') }}</th>
                        <th>{{ trans('messages.name') }}</th>
                        <th>{{ trans('messages.contactDetails') }}</th>
                        <th>{{ trans('messages.comments') }}</th>
                        <th>{{ trans('messages.actionViewOrder') }}</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data as $order)
                        <tr>
                            <td>{{ $order->id }}</td>
                            <td>{{ $order->date }}</td>
                            <td>{{ $order->name }}</td>
                            <td>{{ $order->contactDetails }}</td>
                            <td>{{ $order->comments }}</td>
                            <td>
                                <a href="{{ route('order', $order->id) }}">{{ trans('messages.seeOrder') }}</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <h3>{{ trans('messages.notOrders') }}</h3>
        @endif
        <a href="{{ route('products') }}">{{ trans('messages.productPage') }}</a>
    </div>

@endsection
