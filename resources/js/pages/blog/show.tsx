import SiteLayout from '@/layouts/site-layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface Post {
    sys: { id: string };
    fields: {
        title: string;
        content: Document;
        imageUrl?: string;
    };
}

type Props = {
    post: Post;
};

export default function ShowPost({ post }: Props) {
    return (
        <SiteLayout title={post.fields.title}>
            <h1 className="mb-4 text-3xl font-bold">{post.fields.title}</h1>

            {post.fields.imageUrl && <img src={post.fields.imageUrl} alt={post.fields.title} className="mb-6 max-w-lg rounded shadow" />}

            <div>{documentToReactComponents(post.fields.content)}</div>
        </SiteLayout>
    );
}
