import HeroSection from '@/components/HeroSection';
import CardSimple from '@/components/ui/card-simple';
import SiteLayout from '@/layouts/site-layout';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from '@contentful/rich-text-types';

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
            <SiteLayout title="Blog">
                <HeroSection title="Geen berichten gevonden." />
            </SiteLayout>
        );
    }

    return (
        <SiteLayout title="Blog">
            <HeroSection title="My Blog" />

            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-neutral-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => {
                    const plainText = documentToPlainTextString(post.fields.content);
                    const shortText = plainText.slice(0, 200) + '...';

                    return (
                        <CardSimple
                            key={post.sys.id}
                            title={post.fields.title}
                            description={shortText}
                            link={`/posts/${post.fields.slug}`}
                            image={post.fields.imageUrl}
                            imageAlt={post.fields.title}
                        />
                    );
                })}
            </div>
        </SiteLayout>
    );
}
