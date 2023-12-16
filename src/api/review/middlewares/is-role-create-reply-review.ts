import { Strapi } from "@strapi/strapi";
import { getUserInformation } from "../../../helpers/getUserInformation";
import { isAddRole } from "../../../helpers/isAddRole";
import { ROLES, IAdditionalRole } from "../../../types/roles.type";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    const userId = ctx.state.user.id;
    const user = await getUserInformation(userId, strapi);
    if (!user) return false;

    const additional_roles = user?.additional_roles as IAdditionalRole[];

    if (!additional_roles || additional_roles.length === 0) return false;

    if (!isAddRole(ROLES.CreateReplyReview, additional_roles)) return false;

    await next();
  };
};
