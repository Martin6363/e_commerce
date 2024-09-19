<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ApiResponse
{
    public function successResponse($data = null, $message = null, $code = Response::HTTP_OK)
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public function errorResponse(string $errorMessage = null, $code = Response::HTTP_INTERNAL_SERVER_ERROR)
    {
        return response()->json([
            'error_message' => $errorMessage,
        ], $code);
    }
}
