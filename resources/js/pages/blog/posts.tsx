import SiteLayout from '@/layouts/site-layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface Post {
    sys: { id: string };
    fields: {
        title: string;
        content: any;
        imageUrl?: string;
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
                    {posts.map((post) => (
                        <li key={post.sys.id}>
                            <h2>{post.fields.title}</h2>
                            {post.fields.imageUrl && (
                                <img src={post.fields.imageUrl} alt={post.fields.title} className="my-4 w-full max-w-md rounded shadow" />
                            )}
                            <div>{documentToReactComponents(post.fields.content)}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </SiteLayout>
    );
}
