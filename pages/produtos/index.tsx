import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Footer from "../components/footer";
import { useRouter } from "next/router";
import { ProductHelper } from "../../server/helpers/product";
import { useForm, SubmitHandler } from "react-hook-form";
import { CategoryHelper } from "../../server/helpers/category";

type Inputs = {
  category: string;
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

interface product {
  idProduto: string;
  nome: string;
  slug: string;
  detalhe: string;
  cor: string;
  resumo: string;
  medida: string;
  valor: string;
  estoque: string;
  destaque: string;
  subCategoria: Array<{
    idCategoriaSub: string;
    nomeSub: string;
    categoria: string;
  }>;
  foto: Array<{
    urli: string;
    principal: string;
  }>;
}

export default function Example(props: any) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState("" as string | string[] | undefined);
  const [dataProducts, setDataProducts] = useState([{}] as [
    {
      produto: Array<product>;
      totalRegistros: number;
      paginaAtual: number;
    }
  ]);
  const [categoryList, setCategoryList] = useState([{}] as [
    {
      idCategoria: string;
      imagem: string;
      nome: string;
    }
  ]);

  const [totalPage, setTotalPage] = useState([] as Array<number>);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (router.query.category) {
      const Query = router.query.category;
      setCategory(Query);
      setValue("category", String(Query));
      fiterProduct(Query);
    }
  }, [router, categoryList]);

  useEffect(() => {
    if (router.query.page) {
      const Page = Number(router.query.page);
      setPage(Page);
    }
  }, [router]);

  useEffect(() => {
    const Products = JSON.parse(props.products);
    const TotalPage = [];
    setDataProducts(JSON.parse(props.products));
    setCategoryList(JSON.parse(props.category));
    for (let i = 0; i < Products[0].paginaTotal; i++) {
      TotalPage.push(i);
    }
    setTotalPage(TotalPage);
  }, [props]);

  async function fiterProduct(id: any) {
    try {
      const products = await ProductHelper.getProductAll({ idCategoria: id });
      setDataProducts(products);
    } catch (error) {
      console.log(error);
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    fiterProduct(data.category);

  function FromProductPage(id: string) {
    router.push({
      pathname: "/produtos/" + id,
    });
  }

  return (
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
                          <img className="h-24 w-auto" src="/logo.svg" alt="" />
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
            Nossos Produtos
          </h1>
          <p className="mt-4 text-xl text-white">
            Os melhores produtos você encontra aqui em nossa loja!
          </p>
        </div>
      </div>

      <main>
        {/* Collection section */}
        <section className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
          >
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Categorias
              </label>
              <select
                id="location"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm rounded-md"
                {...register("category")}
              >
                <option value={""}>Todos</option>
                {categoryList.map((category, idx) => {
                  return (
                    <option
                      key={category.idCategoria + idx}
                      value={category.idCategoria}
                    >
                      {category.nome}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                SubCategorias
              </label>
              <select
                id="location"
                name="location"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm rounded-md"
                defaultValue={category}
              >
                <option value={"Todos"}>Todos</option>
                <option value={"Mesas"}>Mesas</option>
                <option value={"Sofás"}>Sofás</option>
                <option value={"Cadeiras"}>Cadeiras</option>
                <option value={"Poltronas"}>Poltronas</option>
              </select>
            </div>
            <div>
              <div className="mt-1 relative flex items-center my-auto">
                <button
                  type={"submit"}
                  className="mt-5 inline-flex items-center px-3 py-1 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Buscar Produtos
                </button>
              </div>
            </div>
          </form>
        </section>
        <section
          aria-labelledby="collection-heading"
          className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-8">
            {dataProducts[0].produto &&
              dataProducts[0].produto.map((collection) => (
                <div key={collection.nome} className="group block mb-20">
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
                  <p className="mt-2 min-h-[40px] text-sm text-gray-500">
                    {collection.resumo}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-500">
                    R$:{collection.valor},00
                  </p>
                  <h3 className="text-base h-[10px] font-semibold text-gray-900">
                    {collection.estoque === "SIM" ? "*Em Estoque" : ""}
                  </h3>
                  <Link href={`/produtos/${collection.slug}`}>
                    <a className="mt-8 w-full block bg-gray-800 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-gray-500 sm:w-auto">
                      Detalhes do Produto
                    </a>
                  </Link>
                </div>
              ))}
          </div>
          {}
          <nav className="border-t border-gray-200 px-4 mt-20 flex items-center justify-between sm:px-0">
            <div className="-mt-px w-0 flex-1 flex">
              {page !== 1 && (
                <a
                  href="#"
                  className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <ArrowLeftIcon
                    className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Anterior
                </a>
              )}
            </div>
            <div className="hidden md:-mt-px md:flex">
              {totalPage.map((page, idx) => {
                return (
                  <a
                    key={page + idx}
                    href="#"
                    onClick={() => {
                      router.push({
                        pathname: "/produtos/",
                        query: { ...router.query, page: page + 1 },
                      });
                    }}
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  >
                    {page + 1}
                  </a>
                );
              })}
              {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
            </div>
            <div className="-mt-px w-0 flex-1 flex justify-end">
              {totalPage.length > 1 && (
                <a
                  href="#"
                  className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Próximo
                  <ArrowRightIcon
                    className="ml-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </nav>
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
                  Precisa de um projeto especial ou algum móvel sobre encomenda?
                  Entre em contato conosco e faça um orçamento sem compromisso
                  com nossa equipe de atendimento!
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
  );
}

export async function getServerSideProps() {
  const products = await ProductHelper.getProductAll({});
  const category = await CategoryHelper.getCategory();

  const Products = JSON.stringify(products);
  const Category = JSON.stringify(category);

  return {
    props: {
      products: Products,
      category: Category,
    },
  };
}
