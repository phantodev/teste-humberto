import api from "../index";

export class ProductHelper {
  static async getProductMain() {
    try {
      const { data } = await api.get("/getProdutoDestaque");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getProductAll(values: any) {
    const { idCategoria, idSubCategoria, page } = values;

    try {
      const { data } = await api.post("/getAllProduto", {
        idCategoria: idCategoria || "",
        idSubCategoria: idSubCategoria || "",
        pagina: page || "",
      });
      return data;
    } catch (error) {}
  }
  static async getProductDetails(id: string) {
    try {
      const { data } = await api.post("/getProdutoDetalheBySlug", {
        slug: id,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
