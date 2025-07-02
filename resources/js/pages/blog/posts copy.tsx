import SiteLayout from '@/layouts/site-layout';
import { useEffect, useState } from 'react';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface Post {
  id: string;
  title: string;
  content: any; // Rich text JSON van Contentful
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentfulData = async () => {
      try {
        const res = await fetch(
          'https://cdn.contentful.com/spaces/jkbhph690oat/environments/master/entries?access_token=N4KnGmsK7zh7V1Q6BWKMEMMhm4wjK8Mv2sWJ_mbUPpY&content_type=blogPost'
        );
        const data = await res.json();

        const blogPosts = data.items.map((item: any) => ({
          id: item.sys.id,
          title: item.fields.title,
          content: item.fields.content,
        }));

        setPosts(blogPosts);
      } catch (err) {
        console.error('Fout bij het ophalen van Contentful data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContentfulData();
  }, []);

  if (loading) return <p>Bezig met laden...</p>;

  return (
    <SiteLayout title="Welcome">
      <h1 className="mb-1 font-medium">Blog page</h1>
      <div>
        <h1>Blog Posts van Contentful</h1>
        {posts.length === 0 ? (
          <p>Geen berichten gevonden.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <div>{documentToReactComponents(post.content)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SiteLayout>
  );
}
