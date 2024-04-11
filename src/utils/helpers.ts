export const formattingDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const setInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const mappingFields = (list: string[]) => {
  let fields: any = {
    repo_manager: "Repository Manager",
    repositryName: "Repository Name",
    tag: "Tag",
    version: "Version",
    description: "Description",
    ref: "Ref",
    commit: "Commit",
    createdBy: "Created By",
    createdAt: "Created At",
    remoteUrl: "Remote URL",
  };
  return list.map((item: string) => fields[item]);
};
