import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get('query');

  // Handle if query is not present
  if (query === null) {
    return new Response(
      JSON.stringify({
        error: 'Query param is missing',
      }),
      {
        status: 400, // Bad request
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const allBlogArticles: CollectionEntry<'blog'>[] = await getCollection(
    'blog'
  );

  // Filter articles based on query
  const searchResults = allBlogArticles.filter((article) => {
    const titleMatch: boolean = article.data.title
      .toLowerCase()
      .includes(query!.toLowerCase());

    const bodyMatch: boolean = article.body
      .toLowerCase()
      .includes(query!.toLowerCase());

    const slugMatch: boolean = article.slug
      .toLowerCase()
      .includes(query!.toLowerCase());

    return titleMatch || bodyMatch || slugMatch;
  });

  return new Response(JSON.stringify(searchResults), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Retrieve all slugs or entries you want to pre-render
//   const entries = await getEntries('blog'); // Fetch all blog entries in advance

//   return entries.map((entry: any) => ({
//     params: { slug: entry.slug }, // Pass each slug to generate a static page
//   }));
// };

// type paramsType = {
//   slug: string
// }

// export const GET: APIRoute = async ({ url }): Promise<Response> => {
//   const slug: string | null = url.searchParams.get('query');

//   if (!slug) {
//     throw new Error('Slug is required');
//   }

//   const entry = await getEntry('blog', slug);

//   if (!entry) {
//     return new Response(JSON.stringify({ message: 'Not found' }), {
//       status: 400,
//     })
//   }

//   // Render the content directly since we are using static generation
//   const { Content } = await entry.render();

//   return new Response(Content,
//     {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     }
//   )
// }
