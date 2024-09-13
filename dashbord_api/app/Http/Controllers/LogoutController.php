<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class LogoutController extends Controller
{
    public function logout(Request $request) {
        try{

            $accessToken = $request->bearerToken();
            if($accessToken) {
                $token = PersonalAccessToken::findToken($accessToken);
                if($token) {
                    $token->delete();
                    return (new ServiceController())->apiResponse(200,[],"Logout successfully!");
                }
            }
            
        } catch (\Exception $e) {

            return (new ServiceController())->apiResponse(500,[],$e->getMessage());

        }
    }
}
