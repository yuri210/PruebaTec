<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Middleware\ApiKeyMiddleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApiKeyMiddlewareTest extends TestCase
{
    private ApiKeyMiddleware $middleware;

    protected function setUp(): void
    {
        parent::setUp();
        $this->middleware = new ApiKeyMiddleware();
        
        // Configurar API key para tests
        config(['api.key' => 'test-api-key-123']);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function permite_acceso_con_api_key_valida()
    {
        $request = Request::create('/api/v1/locations', 'GET');
        $request->headers->set('X-API-Key', 'test-api-key-123');

        $response = $this->middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('OK', $response->getContent());
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function rechaza_acceso_sin_api_key()
    {
        $request = Request::create('/api/v1/locations', 'GET');
        // Sin header X-API-Key

        $response = $this->middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });

        $this->assertEquals(401, $response->getStatusCode());
        
        $content = json_decode($response->getContent(), true);
        $this->assertEquals('Invalid or missing API key', $content['error']['message']);
        $this->assertEquals('E_INVALID_API_KEY', $content['error']['code']);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function rechaza_acceso_con_api_key_incorrecta()
    {
        $request = Request::create('/api/v1/locations', 'GET');
        $request->headers->set('X-API-Key', 'clave-incorrecta');

        $response = $this->middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });

        $this->assertEquals(401, $response->getStatusCode());
        
        $content = json_decode($response->getContent(), true);
        $this->assertEquals('Invalid or missing API key', $content['error']['message']);
    }
}