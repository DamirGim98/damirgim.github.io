import DataService from "../API/DataService";

export const fetchAllData = async () => {
  const authors = await DataService.getAll("authors");
  const locations = await DataService.getAll("locations");
  return {
    authors,
    locations,
  };
};
