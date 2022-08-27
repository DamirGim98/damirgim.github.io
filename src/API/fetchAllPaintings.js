import axios from "axios";

const BASE_URL = "https://test-front.framework.team/paintings?";

export const fetchAllPaintings = async (debouncedFilter, page) => {
  return await axios.get(BASE_URL, {
    params: {
      q: debouncedFilter.query,
      _page: page,
      _limit: debouncedFilter.limit,
      authorId: debouncedFilter.authorId || null,
      created_gte: debouncedFilter.dateStart || null,
      created_lte: debouncedFilter.dateEnd || null,
      locationId: debouncedFilter.locationId || null,
    },
  });
};
