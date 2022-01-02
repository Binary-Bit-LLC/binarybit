import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { categories } from "../constants/Categories";

const latestContentCount: number = 10;
const mainPagePreviewArticlesCount: number = 5;
let contentArray: { id: string; category: string }[];
let contentCategoriesArray: { id: string }[][];

// Maybe use key-value pairs instead?

export function getSortedContentData(
  category: string
): { id: string; category: string }[] {
  const directory: string = path.join(process.cwd(), `articles/${category}`);
  const fileNames: string[] = fs.readdirSync(directory);
  const allContentData: { id: string; category: string }[] = fileNames.map(
    (fileName) => {
      const id: string = fileName.replace(/\.md$/, "");
      const fullPath: string = path.join(directory, fileName);
      const fileContents: string = fs.readFileSync(fullPath, "utf8");
      const matterData: matter.GrayMatterFile<string> = matter(fileContents);
      return {
        id,
        category,
        ...matterData.data,
      };
    }
  );
  // @ts-ignore
  return allContentData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export const getSortedContentDataByCategory = (): { id: string }[][] => {
  const sortedContentData: { id: string; category: string }[][] = [];
  categories.forEach((category) => {
    sortedContentData.push(
      getSortedContentData(category.id).slice(0, mainPagePreviewArticlesCount)
    );
  });
  contentCategoriesArray = sortedContentData;
  contentArray = [
    // should probably do some iteration for this, but I'm too tired to do that rn
    ...sortedContentData[0],
    ...sortedContentData[1],
    ...sortedContentData[2],
    ...sortedContentData[3],
    ...sortedContentData[4],
  ];
  return sortedContentData;
};

export const getSortedContentDataGivenContent = (): { id: string }[] => {
  return (
    contentArray
      // @ts-ignore
      .sort(({ date: a }, { date: b }) => {
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      })
      .slice(0, latestContentCount)
  );
};

export function getAllContentIds(): { params: { id: string } }[] {
  let fileNames: string[] = [];
  categories.forEach((category) => {
    const directory = path.join(process.cwd(), `articles/${category.id}`);
    fileNames.push(...fs.readdirSync(directory));
  });
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getAllContentIdsByCategory(
  category: string
): { params: { id: string } }[] {
  const directory: string = path.join(process.cwd(), `articles/${category}`);
  const fileNames: string[] = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getContentData(id: string) {
  if (!contentArray) getSortedContentDataByCategory();
  const contentData: { id: string; category: string } | undefined =
    contentArray.find((article: { id: string; category: string }) => {
      return article.id === id;
    });
  if (!contentData)
    return { contentHtml: "Article error. Please contact an administrator" };
  const directory: string = path.join(
    process.cwd(),
    `articles/${contentData.category}`
  );
  const fullPath: string = path.join(directory, `${id}.md`);
  const fileContents: string = fs.readFileSync(fullPath, "utf8");
  const matterData: matter.GrayMatterFile<string> = matter(fileContents);
  const processedContent = await remark().use(html).process(matterData.content);
  const contentHtml: string = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterData.data,
  };
}
