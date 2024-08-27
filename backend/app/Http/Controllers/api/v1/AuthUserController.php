<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LogUserRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Mail\UserVerification;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthUserController extends Controller
{
    public function register(RegisterRequest $request)
    {

        try {
            $user = new User();

            $user->name = $request->name;
            $user->email = $request->email;

            $user->password = Hash::make($request->password, [
                'rounds' => 12
            ]);

            $user->save();

            // Mail::to($user->email)->send(new UserVerification($user));

            return response()->json([
                'code' => 200,
                'message' => "Registered successfully",
                'user' => $user
            ], 200);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->email)->first();
            $token = $user->createToken('auth_token')->plainTextToken;

            // if (!$user->hasVerifiedEmail()) {
            //     return response()->json(['code' => 403, 'message' => 'Email not verified.'], 403);
            // }

            return response()->json([
                'message' => "Login successfully",
                'token' => $token,
                'user' => new UserResource($user)
            ], 200);
        } else {
            return response()->json([
                'code' => 403,
                'message' => "Invalid email or password.",
            ], 403);
        }
    }


    public function logout(Request $request)
    {
        if (Auth::user()) {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Logout failed',
            ], 401);
        }
    }

    public function authUser()
    {
        if (Auth::check()) {
            return response()->json([
                'success' => true,
                'data' => Auth::user()
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Data not found',
        ], 403);
    }
}
