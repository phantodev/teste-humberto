import api from "../index";

export class CategoryHelper {
  static async getCategory() {
    try {
      const { data } = await api.get("/getAllCategoria");
      return data
    } catch (error) {
      console.log(error);
    }
  }
}
