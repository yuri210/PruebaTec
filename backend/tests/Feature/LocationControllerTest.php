<?php

namespace Tests\Feature;

use App\Models\Location;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LocationControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private string $apiKey = 'test-api-key-123';

    protected function setUp(): void
    {
        parent::setUp();
        config(['api.key' => $this->apiKey]);
    }

    /** @test */
    public function puede_obtener_lista_de_ubicaciones()
    {
        // Crear algunas ubicaciones de prueba
        Location::factory()->count(5)->create();

        $response = $this->withHeaders([
            'X-API-Key' => $this->apiKey,
            'Accept' => 'application/json',
        ])->get('/api/v1/locations');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        '*' => ['id', 'code', 'name', 'image', 'created_at', 'updated_at']
                    ],
                    'meta' => ['current_page', 'per_page', 'total', 'last_page']
                ]);
    }

    /** @test */
    public function puede_filtrar_ubicaciones_por_nombre()
    {
        Location::factory()->create(['name' => 'Oficina Madrid', 'code' => 'MAD001']);
        Location::factory()->create(['name' => 'Oficina Barcelona', 'code' => 'BCN001']);
        Location::factory()->create(['name' => 'Centro Valencia', 'code' => 'VAL001']);

        $response = $this->withHeaders([
            'X-API-Key' => $this->apiKey,
        ])->get('/api/v1/locations?name=Oficina');

        $response->assertStatus(200);
        
        $data = $response->json('data');
        $this->assertCount(2, $data);
        
        // Verificar que ambos contienen "Oficina" en el nombre
        foreach ($data as $location) {
            $this->assertStringContainsString('Oficina', $location['name']);
        }
    }

    /** @test */
    public function puede_crear_nueva_ubicacion()
    {
        $locationData = [
            'code' => 'TEST001',
            'name' => 'Oficina de Prueba',
            'image' => 'https://ejemplo.com/imagen.jpg'
        ];

        $response = $this->withHeaders([
            'X-API-Key' => $this->apiKey,
            'Accept' => 'application/json',
        ])->post('/api/v1/locations', $locationData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'data' => ['id', 'code', 'name', 'image', 'created_at', 'updated_at'],
                    'message'
                ]);

        // Verificar que se guardó en la base de datos
        $this->assertDatabaseHas('locations', [
            'code' => 'TEST001',
            'name' => 'Oficina de Prueba'
        ]);
    }

    /** @test */
    public function valida_datos_requeridos_al_crear_ubicacion()
    {
        $response = $this->withHeaders([
            'X-API-Key' => $this->apiKey,
            'Accept' => 'application/json',
        ])->post('/api/v1/locations', []);

        $response->assertStatus(422)
                ->assertJsonStructure([
                    'error' => [
                        'message',
                        'code',
                        'details' => ['code', 'name']
                    ]
                ]);
    }

    /** @test */
    public function rechaza_codigo_duplicado()
    {
        Location::factory()->create(['code' => 'DUP001']);

        $response = $this->withHeaders([
            'X-API-Key' => $this->apiKey,
            'Accept' => 'application/json',
        ])->post('/api/v1/locations', [
            'code' => 'DUP001',
            'name' => 'Ubicación Duplicada'
        ]);

        $response->assertStatus(422);
        
        $errors = $response->json('error.details');
        $this->assertArrayHasKey('code', $errors);
        $this->assertStringContainsString('already exists', $errors['code'][0]);
    }

    /** @test */
    public function aplica_paginacion_correctamente()
    {
        Location::factory()->count(25)->create();

        $response = $this->withHeaders([
            'X-API-Key' => $this->apiKey,
        ])->get('/api/v1/locations?per_page=10&page=2');

        $response->assertStatus(200);
        
        $meta = $response->json('meta');
        $this->assertEquals(2, $meta['current_page']);
        $this->assertEquals(10, $meta['per_page']);
        $this->assertEquals(25, $meta['total']);
        $this->assertEquals(3, $meta['last_page']);
    }
}