import { getAllContentIds } from "../../lib/articles";
import Layout from "../../components/Layout/Layout";
import { authors } from "../../constants/Authors";
import styles from "../../styles/Authors.module.sass";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import { Author } from "../../constants/Types";

// add back button to go back to previous page
export async function getStaticProps({ params }) {
  const authorid: string = params.authorid;
  return {
    props: {
      authorid: authorid,
    },
  };
}

export async function getStaticPaths() {
  // const paths = ["/authors/danielmiller"];
  let paths: string[] = [];
  for (const [key, value] of Object.entries(authors)) {
    paths.push(`/authors/${value.id}`);
  }
  return {
    paths,
    fallback: false,
  };
}

export default ({ authorid }: { authorid: string }) => {
  const author: Author = authors[authorid];
  const metadata: { title: string; description: string } = {
    title: `${author.label} - Binary Bit`,
    description: author.bio,
  };
  return (
    <Layout metadata={metadata}>
      <div className={styles.container}>
        <AuthorCard author={author} />
      </div>
    </Layout>
  );
};
