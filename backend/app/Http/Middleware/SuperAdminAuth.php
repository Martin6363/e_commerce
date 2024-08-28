<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!$request->user()->type == 2){ // super admin = 2
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Only superVizorAdmin can perform this action.'
            ], 403);
        }
        return $next($request);
    }
}
