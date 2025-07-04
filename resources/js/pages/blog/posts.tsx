import SiteLayout from '@/layouts/site-layout';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from '@contentful/rich-text-types';
import { Link } from '@inertiajs/react';

interface Post {
    sys: { id: string };
    fields: {
        title: string;
        content: Document; // in plaats van any
        imageUrl?: string;
        slug: string;
    };
}

type Props = {
    posts: Post[];
};

export default function BlogPosts({ posts }: Props) {
    if (!posts || posts.length === 0) {
        return (
            <SiteLayout title="Welcome">
                <h1>Blog Posts van Contentful</h1>
                <p>Geen berichten gevonden.</p>
            </SiteLayout>
        );
    }

    return (
        <SiteLayout title="Welcome">
            <h1 className="mb-1 font-medium">Blog page</h1>
            <div>
                <h1>Blog Posts van Contentful</h1>
                <ul>
                    {posts.map((post) => {
                        const plainText = documentToPlainTextString(post.fields.content);
                        const shortText = plainText.slice(0, 200) + '...';

                        return (
                            <li key={post.sys.id}>
                                <Link href={`/posts/${post.fields.slug}`}>
                                    <h2 className="text-blue-600 hover:underline">{post.fields.title}</h2>
                                </Link>

                                {post.fields.imageUrl && (
                                    <img src={post.fields.imageUrl} alt={post.fields.title} className="my-4 w-full max-w-md rounded shadow" />
                                )}
                                <div>{shortText}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </SiteLayout>
    );
}
