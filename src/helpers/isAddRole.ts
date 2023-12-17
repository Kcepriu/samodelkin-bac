import { IAdditionalRole, ROLES } from "../types/roles.type";

export const isAddRole = (roleName: ROLES, addRolesUser: IAdditionalRole[]) => {
  const result = addRolesUser.find((role) => role.type === roleName);

  return !!result;
};
