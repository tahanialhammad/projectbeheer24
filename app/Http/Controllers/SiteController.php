<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Services\ContentfulService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class SiteController extends Controller
{
    public function welcome()
    {

        $services = Service::all();
        $initialTime = 7200;
        return Inertia::render('home/welcome', compact('services', 'initialTime'));
    }

    public function services()
    {
        return Inertia::render('services/services', [
            "services" => Service::all()
        ]);
    }


    public function posts(ContentfulService $contentful)
    {
        //  return Inertia::render('blog/posts');

        // $spaceId = env('CONTENTFUL_SPACE_ID');
        // $accessToken = env('CONTENTFUL_ACCESS_TOKEN');

        // $response = Http::get("https://cdn.contentful.com/spaces/{$spaceId}/environments/master/entries", [
        //     'access_token' => $accessToken,
        //     'content_type' => 'blogPost',
        //     'include' => 1, // Belangrijk om gerelateerde media zoals afbeeldingen mee te halen

        // ]);

        // $data = $response->json();

        $data = $contentful->fetchEntries('blogPost', 1);


        // Stuur alleen de ruwe data door naar de view of frontend
        // return Inertia::render('blog/posts', [
        //     'posts' => $data['items']
        //     ]);


        // Contentful عندما ترسل البيانات ترسل الصور والملفات (Assets) بشكل منفصل في جزء يسمى includes.
        //ثم نستخدم keyBy('sys.id') لكي نجعل كل صورة قابلة للوصول باستخدام الـ ID الخاص بها
        // Verzamel alle assets (zoals afbeeldingen)
        $assets = collect($data['includes']['Asset'] ?? [])->keyBy('sys.id');
        // نأخذ كل مقالة ($item) ونفحص هل فيها صورة أم لا.
        // Voeg image URL toe aan elk post object
        $posts = collect($data['items'])->map(function ($item) use ($assets) {
            return [
                'sys' => $item['sys'],
                'fields' => array_merge($item['fields'], [
                    'imageUrl' => $this->extractImageUrl($item, $assets),
                ]),
            ];
        });


        return Inertia::render('blog/posts', [
            'posts' => $posts,
        ]);
    }


    private function extractImageUrl($item, $assets)
    {
        //إذا كانت تحتوي على صورة، نأخذ الـ ID الخاص بالصورة:
        $imageId = $item['fields']['image']['sys']['id'] ?? null;
        // ثم نبحث عن هذه الصورة داخل $assets باستخدام الـ ID.
        // إذا وجدناها، نستخرج الرابط (url) ونضيفه للمقالة تحت المفتاح 'imageUrl'.
        if ($imageId && isset($assets[$imageId])) {
            return 'https:' . $assets[$imageId]['fields']['file']['url'];
        }

        return null;
    }

    public function showPost(ContentfulService $contentful, $slug)
    {

        $data = $contentful->fetchEntries('blogPost', 1);

        $assets = collect($data['includes']['Asset'] ?? [])->keyBy('sys.id');

        // // Zoek de post met de gevraagde ID
        // $postItem = collect($data['items'])->firstWhere('sys.id', $id);
        $postItem = collect($data['items'])->firstWhere('fields.slug', $slug);

        if (!$postItem) {
            abort(404, 'Post niet gevonden');
        }

        // Voeg image URL toe zoals je al doet
        $post = [
            'sys' => $postItem['sys'],
            'fields' => array_merge($postItem['fields'], [
                'imageUrl' => $this->extractImageUrl($postItem, $assets),
            ]),
        ];

        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    }

    public function faqs(ContentfulService $contentful)
    {
        $data = $contentful->fetchEntries('faqGroup', 2);

        $linked = collect($data['includes']['Entry'] ?? [])->keyBy('sys.id');
        // معالجة كل مجموعة FAQ لجلب بياناتها مع الأسئلة المرتبطة
        $groups = collect($data['items'])->map(function ($item) use ($linked) {
            $faqs = collect($item['fields']['faQs'] ?? [])
                ->map(fn($ref) => $linked[$ref['sys']['id']] ?? null)
                ->filter() // إزالة القيم الفارغة
                ->map(fn($faq) => [
                    'question' => $faq['fields']['question'] ?? '',
                    'answer' => $faq['fields']['answer'] ?? [],
                ]);

            return [
                'title' => $item['fields']['title'] ?? '',
                'faqs' => $faqs->values(),
            ];
        });

        return Inertia::render('faq/faqs', [
            'faqGroups' => $groups,
        ]);
    }

    public function about()
    {
        return Inertia::render('about/about');
    }

    public function contact()
    {
        return Inertia::render('contact/contact');
    }
}
