export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // url: env("PUBLIC_URL", "http://localhost:1337"),
  // url: env("PUBLIC_URL", "https://samodelkin-bac.kserhii.com"),
  url: env("PUBLIC_URL", "https://samodelkin-bac.onrender.com"),

  url_front_end: env("URL_FRONT_END", ""),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
