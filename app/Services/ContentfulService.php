<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class ContentfulService
{
    protected string $spaceId;
    protected string $accessToken;

    public function __construct()
    {
        $this->spaceId = env('CONTENTFUL_SPACE_ID');
        $this->accessToken = env('CONTENTFUL_ACCESS_TOKEN');
    }

    public function fetchEntries(string $contentType, int $include = 1): array
    {
        $response = Http::get("https://cdn.contentful.com/spaces/{$this->spaceId}/environments/master/entries", [
            'access_token' => $this->accessToken,
            'content_type' => $contentType,
            'include' => $include,
        ]);

        return $response->json();
    }
}
