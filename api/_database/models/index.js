import mongoose from "mongoose";

import { ResourcesTypesSchema } from "./Resourcestypes";
import { BuildingsTypesSchema } from "./Buildingstypes";
import { UserCitysSchema } from "./Usercitys";

export const ResourcesTypes = mongoose.model("ResourcesType", ResourcesTypesSchema, "resourcestypes");
export const BuildingsTypes = mongoose.model("BuildingsType", BuildingsTypesSchema, "buildingstypes");
export const UserCitys = mongoose.model("UserCity", UserCitysSchema, "usercitys");

