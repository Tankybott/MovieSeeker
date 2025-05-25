export const fetchCategories = async (): Promise<string[]> => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 2000));

  // Dummy categories — to be replaced with real API data later
  return ["Moje", "Akcja", "Komedia", "Thriller", "Sci-Fi", "Dramat"];
};
