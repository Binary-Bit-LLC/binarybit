import { getContentData, getAllContentIds } from "../lib/articles";
import Layout from "../components/Layout/Layout";
import Date from "../components/Date";
import { authors } from "../constants/Authors";
import Link from "next/link";
import styles from "../styles/Content.module.sass";
import { externalLinks } from "../constants/Links";

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
        <article>
          <h1 className={styles.title}>{contentData.title}</h1>
          {author.page ? (
            <Link href={`authors/${author.id}`}>
              {/* is there a better way to have multiple classnames? */}
              <h3 className={[styles.author, styles.link].join(" ")}>
                {author.label}
              </h3>
            </Link>
          ) : (
            <h3 className={styles.author}>{author.label}</h3>
          )}
          <div
            className={[
              styles.dateContainer,
              styles.genericText,
              styles.topMargin,
            ].join(" ")}
          >
            <h4 className={styles.genericText}>Posted&nbsp;</h4>
            <Date dateString={contentData.date} />
            {contentData.date === contentData.updated ? (
              ""
            ) : (
              <div className={styles.updatedContainer}>
                <h4 className={styles.genericText}>
                  &nbsp;&nbsp;-&nbsp;&nbsp;Last Updated&nbsp;
                </h4>
                <Date dateString={contentData.updated} />
              </div>
            )}
          </div>
          <Link href={externalLinks[1].url}>
            <h4
              className={[
                styles.genericText,
                styles.link,
                styles.topMargin,
              ].join(" ")}
            >
              Give us your thoughts in our Matrix space
            </h4>
          </Link>
          <div
            className={[styles.articleText].join(" ")}
            dangerouslySetInnerHTML={{ __html: contentData.contentHtml }}
          />
        </article>
        {/* maybe put a little "About" card on the bottom */}
      </div>
    </Layout>
  );
};
