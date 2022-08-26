import axios from "axios";

export default class LocationService {
  static async getAll() {
    try {
      const response = await axios.get(
        "https://test-front.framework.team/locations"
      );
      return response.data;
    } catch (e) {
      console.log("failed to fetch");
    }
  }
}
