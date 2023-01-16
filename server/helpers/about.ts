import api from "../index";

export class AboutHelper {
  static async getAbout() {
    try {
      const { data } = await api.get("/getAllTextos");
      return data
    } catch (error) {
      console.log(error);
    }
  }
}
