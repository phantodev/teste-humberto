import api from "../index";

export class BannerHelper {
  static async getBanner() {
    try {
      const { data } = await api.get("getAllBanner");
      return data
    } catch (error) {
      console.log(error);
    }
  }
}
