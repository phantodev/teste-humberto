import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { ContactHelper } from "../../../server/helpers/contact";

type Inputs = {
  email: string;
};

export default function Footer() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await ContactHelper.sendNewsLetters({
        email: data.email,
      });
      if (response === true) {
        reset();
        return toast.success("Inscrito com sucesso!");
      }
      toast.error("Houve um error ao enviar a mensagem");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="bg-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-1 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Contato
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li className="text-base text-gray-300 hover:text-white">
                    41 3503-1766
                  </li>
                  <li className="text-base text-gray-300 hover:text-white">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://api.whatsapp.com/send?phone=5541991141315&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20produtos!"
                    >
                      41 99114-1315
                    </a>
                  </li>
                  <li className="text-base text-gray-300 hover:text-white">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://api.whatsapp.com/send?phone=5541997650056&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20produtos!"
                    >
                      41 99765-0056
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Endereço
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li className="text-base text-gray-300 hover:text-white">
                    Rua Padre Anchieta, 458
                  </li>
                  <li className="text-base text-gray-300 hover:text-white">
                    Mercês
                  </li>
                  <li className="text-base text-gray-300 hover:text-white">
                    Curitiba/PR
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Politicas
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li className="text-base text-gray-300 hover:text-white">
                    <a href="/politicas/Trocas-e-Devoluções">
                      Trocas e Devoluções
                    </a>
                  </li>
                  <li className="text-base text-gray-300 hover:text-white">
                    <a href="/politicas/Política-de-Privacidade">
                      Política de Privacidade
                    </a>
                  </li>
                  <li className="text-base text-gray-300 hover:text-white">
                    <a href="/politicas/Política-de-Arrependimento">
                      Política de Arrependimento
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Inscreva-se em nossa newsletters
            </h3>
            <p className="mt-4 text-base text-gray-300">
              Receba as últimas noticias, dicas e matérias sobre o mundo do
              design e interiores.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 sm:flex sm:max-w-md"
            >
              <label htmlFor="email-address" className="sr-only">
                Seu e-mail
              </label>
              <input
                type="email"
                id="email-address"
                {...register("email", { required: true })}
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Seu melhor e-mail"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  Inscrever-me
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <p className="flex">
              <button type="button" className="-ml-2 p-2 text-white">
                <img src="/instagram-icon.png" alt="" className="" />
              </button>
              <button type="button" className="-ml-2 p-2 text-white">
                <img src="/facebook-icon.png" alt="" className="" />
              </button>
              <button type="button" className="-ml-2 p-2 text-white">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://api.whatsapp.com/send?phone=5541997650056&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20produtos!"
                >
                  <img src="/zap-icon.png" alt="" className="" />
                </a>
              </button>
            </p>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2022 Back Home Design, Todos os direitos reservado.
          </p>
        </div>
      </div>
    </footer>
  );
}
