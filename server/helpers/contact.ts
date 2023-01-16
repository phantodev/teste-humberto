import api from "../index";

const ApiKey = "ACCF92313A65763FD661DB9A986DCF0B125B297B";

export class ContactHelper {
  static async sendConcact(values: {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
  }) {
    try {
      const { data } = await api.post("/SendContact", values, {
        headers: { api_key: ApiKey },
      });
      return data;
    } catch (error) {
      console.log(error);
      return { status: "error" };
    }
  }
  static async sendNewsLetters(values: { email: string }) {
    try {
      const { data } = await api.post("/SendNewsletter", values, {
        headers: { api_key: ApiKey },
      });
      return data;
    } catch (error) {
      console.log(error);
      return { status: "error" };
    }
  }
}
