<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiKeyMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-API-Key');
        $validApiKey = config('api.key');

        if (!$apiKey || $apiKey !== $validApiKey) {
            return response()->json([
                'error' => [
                    'message' => 'Invalid or missing API key',
                    'code' => 'E_INVALID_API_KEY'
                ]
            ], 401);
        }

        return $next($request);
    }
}