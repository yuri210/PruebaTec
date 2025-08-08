<?php

return [
    'key' => env('API_KEY'),
    'rate_limit' => [
        'max_attempts' => env('API_RATE_LIMIT', 60),
        'decay_minutes' => 1,
    ],
    'version' => 'v1',
];