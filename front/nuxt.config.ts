export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/image"],
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  app: {
    head: {
      title: "STORE Интернет-магазин",
      link: [
        {
          rel: "icon",
          type: "image/ico",
          href: "/logo.ico",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Yuji+Mai&display=swap",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL || "http://localhost:8080",
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  image: { dir: "public" },
  compatibilityDate: "2024-08-14",
});
