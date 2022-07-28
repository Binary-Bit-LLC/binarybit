import { getContentData, getAllContentIds } from "../lib/articles";
import Layout from "../components/Layout/Layout";
import { authors } from "../constants/Authors";
import styles from "../styles/Content.module.scss";
import ArticleData from "../components/ArticleData/ArticleData";
import AuthorCard from "../components/AuthorCard/AuthorCard";

// add back button to go back to previous page
export async function getStaticProps({ params }) {
  const contentData = await getContentData(params.id);
  return {
    props: {
      contentData: contentData,
    },
  };
}
export async function getStaticPaths() {
  const paths = getAllContentIds();
  return {
    paths,
    fallback: false,
  };
}

export default ({ contentData }) => {
  const author = authors[contentData.authorid];
  const metadata: { title: string; description: string; author: string } = {
    title: `${contentData.title} - Binary Bit`,
    description: contentData.description,
    author: author.label,
  };
  return (
    <Layout metadata={metadata}>
      <div className={styles.container}>
        <article className="flex flex-col items-center justify-center">
          <ArticleData
            author={author}
            title={contentData.title}
            date={contentData.date}
            updated={contentData.updated}
          />
          <div
            className="mt-10 text-xl leading-10 mx-4"
            dangerouslySetInnerHTML={{ __html: contentData.contentHtml }}
          />
        </article>
        <AuthorCard author={author} className="mt-12" link={true} />
      </div>
    </Layout>
  );
};
