<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function apiResponse($status,$data,$message=''){
        return response()->json([
            'status_code' => $status,
            'data' => $data,
            'message' => $message
        ]);
    }
}
