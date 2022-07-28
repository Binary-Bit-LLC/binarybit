export type Author = {
  id: string;
  label: string;
  website: string;
  picture: string | undefined;
  bio: string;
  page: boolean;
};

export type Article = {
  authorid: string;
  category: string;
  coverimage: string;
  date: string;
  description: string;
  id: string;
  title: string;
  updated: string;
};
