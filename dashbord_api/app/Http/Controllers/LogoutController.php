<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class LogoutController extends Controller
{

       /**
 * @OA\Post(
 *     path="/api/logout",
 *     tags={"Authentication"},
 *     summary="Logout the user",
 *     operationId="logout",
 *     security={{"bearerAuth": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="Successfully logged out",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="boolean", example=true),
 *             @OA\Property(property="message", type="string", example="You are disconnected")
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthorized",
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal Server Error",
 *     )
 * )
 */
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
