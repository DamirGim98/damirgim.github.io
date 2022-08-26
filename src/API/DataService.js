import axios from "axios";

export default class DataService {
  static async getAll(params) {
    const response = await axios.get(
      `https://test-front.framework.team/${params}`
    );
    return response.data;
  }
}
