<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use App\Http\Requests\AdminAuthorization;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{   
    public function logoutAdmin(Request $request)
    {
        session()->forget('admin');
        return $request->ajax()? response()->json(['message' => 'You disconnected.', 'admin'=>false]) : redirect()->route('login');
    }
    public function viewLogin(Request $request)
    {
        if (!session('admin')) {
            return $request->ajax() ? response()->json(['sessionAdmin'=>false, 'statusCode' => 401,  'message' => 'Unauthenticated' ]) : view('login');
        } else {
            return redirect()->route('products');
        }
    }

    public function validateLogin(Request  $request)
    {
        if($request->ajax()){
            $adminMail = Config::get('credentialsAdmin.adminEmail');
            $adminPassword = Config::get('credentialsAdmin.adminPassword');

            $validator = Validator::make($request->all(), [
                'adminMail' => 'required|email|in:'.$adminMail,
                'adminPassword' => 'required|in:'.$adminPassword
            ]);  
            
            if (!$validator->passes()) {
                return response()->json(['status'=>0, 'credentials' => trans('messages.invalid'),'error'=>$validator->errors()->toArray()]);
            }else{
                session(['admin' => true]);
                return response()->json(['checkAdmin' => 'succes']) ;
            }
        }
        
        if ($request->input('adminMail') === Config::get('credentialsAdmin.adminEmail') && $request->input('adminPassword') === Config::get('credentialsAdmin.adminPassword')) {
            return redirect('products')->with('checkAdmin', session(['admin' => true]));
        } else {
            return $request->ajax() ? response()->json('error') : redirect()->back()->with('error', trans('messages.invalid'));
        }
    }
}