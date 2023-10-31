<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use App\Http\Requests\AdminAuthorization;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;

class AuthController extends Controller
{   
    public function logoutAdmin()
    {
        session()->forget('admin');
        return redirect()->route('login');
    }
    public function viewLogin(Request $request)
    {
        if (!session('admin')) {
            
            return $request->ajax() ? response()->json(view('login')->render()) : view('login');
        } else {
            return redirect()->route('products');
        }
    }

    public function validateLogin(AdminAuthorization  $request)
    {
        if ($request->input('adminMail') === Config::get('credentialsAdmin.adminEmail') && $request->input('adminPassword') === Config::get('credentialsAdmin.adminPassword')) {
            return redirect('products')->with('checkAdmin', session(['admin' => true]));
        } else {
            return redirect()->back()->with('error', trans('messages.invalid'));
        }
    }
}