import Link from "next/link";
import { builder } from "@builder.io/react";

const BUILDER_API_KEY = 'a49cc212e97c429287c2a9fda4e8b890';
builder.init(BUILDER_API_KEY);

const ARTICLES_PER_PAGE = 30;

function Blog({ articles, pageNumber }) {
  return (
    <div className="articles-wrapper">
      <h1 className="blog-title">Blog</h1>
      <div className="articles-container">
        {articles.map((item, index) => (
          <Link key={index} href={`/blog/${item.data.handle}`}>
            <div className="article">
              <div className="article-img">
                <img src={item.data.image} />
              </div>
              <div className="article-bottom">
                <span className="article-title">{item.data.title}</span>
                <span className="article-description">{item.data.blurb}</span>
              </div>
              
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        {pageNumber > 1 && (
          <a href={`/blog/page/${pageNumber - 1}`}>
            ‹ Previous page
          </a>
        )}

        {articles.length > ARTICLES_PER_PAGE && (
          <a href={`/blog/page/${pageNumber + 1}`}>
            Next page ›
          </a>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ query }) {
  // Get the page number from the path or query parameter
  // In this example we are hardcoding it as 1
  const pageNumber = 1;
  const articles = await builder.getAll("blog-article", {
    // Include references, like the `author` ref
    options: { includeRefs: true },
    // For performance, don't pull the `blocks` (the full blog entry content)
    // when listing
    omit: "data.blocks",
    limit: ARTICLES_PER_PAGE,
    offset: (pageNumber - 1) * ARTICLES_PER_PAGE,
  });

  return { props: { articles, pageNumber }};
}

export default Blog;
