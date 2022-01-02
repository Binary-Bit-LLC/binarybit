import type { NextPage } from "next";
import styles from "../styles/Home.module.sass";
import Layout from "../components/Layout/Layout";
import {
  getSortedContentDataByCategory,
  getSortedContentDataGivenContent,
} from "../lib/articles";
import ArticleCard from "../components/ArticleCard/ArticleCard";

const metadata: { title: string; defaultDescription: boolean } = {
  title: "Binary Bit",
  defaultDescription: true,
};

export async function getStaticProps() {
  const allContentData: { id: string }[][] = getSortedContentDataByCategory();
  const sortedContent = getSortedContentDataGivenContent();
  return {
    props: {
      allContentData: allContentData,
      sortedContent: sortedContent,
    },
  };
}

// @ts-ignore
const Home: NextPage = ({ sortedContent }) => {
  return (
    <Layout metadata={metadata}>
      <div className={styles.container}>
        <div className={styles.latestContentContainer}>
          <div className={styles.articleContainer}>
            {sortedContent.map(({ id, title, coverimage }, index) => (
              <ArticleCard
                id={id}
                title={title}
                coverimage={coverimage}
                index={index}
              />
            ))}
          </div>
        </div>
        {/* {allContentData.map((nested, index) => {
          return (
            <div className={styles.articlesContainer}>
              <h2 className={styles.categoryTitle}>
                {categories[index].label}
              </h2>
              <div className={styles.articleContainer}>
              {nested.map(({ id, title, coverimage }) => {
                return (
                  <ArticleCard id={id} title={title} coverimage={coverimage} />
                );
              })}
              </div>
            </div>
          );
        })} */}
      </div>
    </Layout>
  );
};

export default Home;
