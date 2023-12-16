import { Strapi } from "@strapi/strapi";
export const getUserInformation = async (userId: number, strapi: Strapi) => {
  const user = await strapi.entityService.findOne(
    "plugin::users-permissions.user",
    userId,
    {
      populate: {
        additional_roles: true,
      },
    }
  );

  return user;
};
