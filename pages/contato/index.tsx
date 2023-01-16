import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MapIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Footer from "../components/footer";
import { NextSeo } from "next-seo";
import { useForm, SubmitHandler } from "react-hook-form";
import { ContactHelper } from "../../server/helpers/contact";
import { toast } from "react-toastify";
import { ProductHelper } from "../../server/helpers/product";
import { useRouter } from "next/router";

type Inputs = {
  full_name: string;
  email: string;
  phone: string;
  message: string;
};

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Nossa Loja", href: "/empresa" },
    { name: "Pronta Entrega", href: "/produtos" },
    { name: "Consultoria", href: "/consultoria" },
    { name: "Contato", href: "/contato" },
  ],
};

export default function Example(props: any) {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [productMain, setProductMain] = useState([{}] as [
    {
      idProduto: string;
      foto: [{ urli: string }];
      nome: string;
      detalhe: string;
      valor: string;
      href: string;
      resumo: string;
      estoque: string;
      slug: string;
    }
  ]);

  useEffect(() => {
    setProductMain(JSON.parse(props.productMain));
  }, [props]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const sendContactSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await ContactHelper.sendConcact({
        nome: data.full_name,
        email: data.email,
        telefone: data.phone,
        mensagem: data.message,
      });
      if (response === true) {
        reset();
        return toast.success("Mensagem enviada com sucesso!");
      }
      toast.error("Houve um error ao enviar a mensagem");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NextSeo
        title="Black Home Design - Fale Conosco"
        description="Entre em contato e faça seu projeto de design de interior conosco!"
      />
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200"></div>
                  <Tab.Panels as={Fragment}></Tab.Panels>
                </Tab.Group>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        {/* Hero section */}
        <div className="relative bg-gray-900">
          {/* Decorative image and overlay */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 opacity-50"
          />

          {/* Navigation */}
          <header className="relative z-10">
            <nav aria-label="Top">
              {/* Secondary navigation */}
              <div className="backdrop-blur-md backdrop-filter bg-opacity-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div>
                    <div className="h-20 lg:h-40 flex items-center justify-between">
                      {/* Logo (lg+) */}
                      <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-center lg:my-10">
                        <div>
                          <span className="sr-only">Black Home Design</span>
                          <div className="lg:flex-1 lg:flex lg:justify-center">
                            <img
                              className="h-24 w-auto"
                              src="/logo.svg"
                              alt=""
                            />
                          </div>
                          <div className="hidden h-full lg:flex">
                            {/* Flyout menus */}
                            <Popover.Group className="px-4 bottom-0 inset-x-0">
                              <div className="h-full flex justify-center space-x-8">
                                {navigation.pages.map((page) => (
                                  <a
                                    key={page.name}
                                    href={page.href}
                                    className="flex items-center text-lg font-medium text-white"
                                  >
                                    {page.name}
                                  </a>
                                ))}
                              </div>
                            </Popover.Group>
                          </div>
                        </div>
                      </div>

                      {/* Mobile menu and search (lg-) */}
                      <div className="flex-1 flex items-center lg:hidden">
                        <button
                          type="button"
                          className="-ml-2 p-2 text-white"
                          onClick={() => setMobileMenuOpen(true)}
                        >
                          <span className="sr-only">Open menu</span>
                          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Logo (lg-) */}
                      <a href="#" className="lg:hidden">
                        <span className="sr-only">Black Home Design</span>
                        <img src="/logo.svg" alt="" className="h-8 w-auto" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>

          <div className="relative max-w-3xl mx-auto py-20 px-6 flex flex-col items-center text-center sm:py-20 lg:px-0">
            <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
              Fale Conosco
            </h1>
            <p className="mt-4 text-xl text-white">
              Dúvidas, sugestões, reclamações ou encomenda.
            </p>
          </div>
        </div>

        <main>
          {/* Category section */}

          <section
            aria-labelledby="category-heading"
            className="pt-24 xl:max-w-7xl xl:mx-auto"
          >
            <div className="relative bg-white">
              <div className="absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-100" />
              </div>
              <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
                <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                  <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                      Entre em contato
                    </h2>
                    <p className="mt-3 text-lg leading-6 text-gray-500">
                      A Black Home Design busca facilitar sua comunicação. Aqui
                      você pode solicitar informações detalhadas sobre nossos
                      produtos, tirar suas dúvidas ou mesmo enviar sugestões.
                      Preencha seus dados corretamente no formulário e envie sua
                      mensagem.
                    </p>
                    <dl className="mt-8 text-base text-gray-500">
                      <div>
                        <dt className="sr-only">Endereço</dt>
                        <dd>
                          <p>Rua Padre Anchieta, 458 - Mercês</p>
                          <p>Curitiba - Paraná</p>
                        </dd>
                      </div>
                      <div className="mt-6">
                        <dt className="sr-only">Telefone</dt>
                        <dd className="flex">
                          <PhoneIcon
                            className="flex-shrink-0 h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-3">(41) 3503-1766</span>
                        </dd>
                        <dd className="flex">
                          <PhoneIcon
                            className="flex-shrink-0 h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-3">(41) 99114-1315</span>
                        </dd>
                        <dd className="flex">
                          <PhoneIcon
                            className="flex-shrink-0 h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-3">(41) 99765-0056</span>
                        </dd>
                      </div>
                      <div className="mt-3">
                        <dt className="sr-only">Email</dt>
                        <dd className="flex">
                          <MapIcon
                            className="flex-shrink-0 h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-3">
                            contato@blackhomedesign.com
                          </span>
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-6 text-base text-gray-500">
                      Quer trabalhar conosco?{" "}
                      <a
                        href="https://api.whatsapp.com/send?phone=5541997650056&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20produtos!"
                        className="font-medium text-gray-700 underline"
                      >
                        Entre em contato aqui
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                  <div className="max-w-lg mx-auto lg:max-w-none">
                    <form
                      action="#"
                      method="POST"
                      onSubmit={handleSubmit(sendContactSubmit)}
                      className="grid grid-cols-1 gap-y-6"
                    >
                      <div>
                        <label htmlFor="full-name" className="sr-only">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          {...register("full_name", { required: true })}
                          id="full-name"
                          autoComplete="name"
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          placeholder="Nome Completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          id="email"
                          {...register("email", { required: true })}
                          type="email"
                          autoComplete="email"
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="sr-only">
                          Telefone
                        </label>
                        <input
                          type="text"
                          {...register("phone", { required: true })}
                          id="phone"
                          autoComplete="tel"
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          placeholder="Telefone"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="sr-only">
                          Mensagem
                        </label>
                        <textarea
                          id="message"
                          {...register("message", { required: true })}
                          rows={4}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                          placeholder="Mensagem"
                          defaultValue={""}
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Enviar Mensagem
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Collection section */}

          <section
            aria-labelledby="collection-heading"
            className="max-w-xl mx-auto pt-12 px-4 sm:pt-12 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <h2
              id="collection-heading"
              className="text-3xl font-extrabold tracking-tight text-gray-900 flex justify-center"
            >
              Produtos em Estoque
            </h2>
            <p className="mt-4 text-base text-gray-500 text-center">
              Veja os produtos mais vendidos em nossa loj. Entre em contato hoje
              mesmo e faça a sua encomenda!
            </p>
            <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-8">
              {productMain.map((collection) => (
                <div key={collection.nome} className="group block">
                  <div
                    aria-hidden="true"
                    className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
                  >
                    <img
                      src={`${collection.foto && collection.foto[0].urli}`}
                      alt={collection.nome}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    {collection.nome}
                  </h3>
                  <p className="mt-2 text-sm min-h-[40px] truncate text-gray-500">
                    {collection.resumo}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-500">
                    R$: {collection.valor},00
                  </p>
                  <h3 className="text-base h-[10px] font-semibold text-gray-900">
                    {collection.estoque === "SIM" ? "*Em Estoque" : ""}
                  </h3>
                  <Link href={`/produtos/${collection.slug}`}>
                    <a className="my-8 w-full block bg-gray-800 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-gray-500 sm:w-auto">
                      Detalhes do Produto
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Featured section */}
          <section
            aria-labelledby="comfort-heading"
            className="max-w-7xl mx-auto py-12 px-4 sm:py-12 sm:px-6 lg:px-8"
          >
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="/sala-2.jpg"
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
                <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
                  <h2
                    id="comfort-heading"
                    className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                  >
                    Faça sua encomenda!
                  </h2>
                  <p className="mt-3 text-xl text-white">
                    Precisa de um projeto especial ou algum móvel sobre
                    encomenda? Entre em contato conosco e faça um orçamento sem
                    compromisso com nossa equipe de atendimento!
                  </p>
                  <a
                    href="https://api.whatsapp.com/send?phone=5541997650056&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20produtos!"
                    className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                  >
                    Quero encomendar
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer aria-labelledby="footer-heading" className="bg-gray-900">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const productMain = await ProductHelper.getProductMain();

  const ProductMain = JSON.stringify(productMain);
  return {
    props: {
      productMain: ProductMain,
    },
  };
}
