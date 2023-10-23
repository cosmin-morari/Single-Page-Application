@extends('layouts.app')
@section('title', trans('messages.login'))

@section('content')

    <form action="{{ route('validateLogin') }}" method="POST">
        @csrf
        <div class="container">
            <h3>{{ trans('messages.login') }}</h3>
            <input type="text" name="adminMail" placeholder="{{ trans('messages.userName') }}"
                value="{{ old('adminMail') }}">
            @error('adminMail')
                <p style="color:red;">{{ $message }}</p>
            @enderror
            <br><br>
            <input type="password" name="adminPassword" placeholder="{{ trans('messages.password') }}"
                value="{{ old('adminPassword') }}">
            @error('adminPassword')
                <p style="color:red;">{{ $message }}</p>
            @enderror
            <br><br>
            @if (session('error'))
                <p style="color:red;">{{ session('error') }}</p>
            @endif
            <button type="submit">{{ trans('messages.login') }}</button>
        </div>
    </form>

@endsection