import constituentModel from "../models/constituentModel";

// would add in filtering, projection, option for lean/non-lean etc.- WIP
export async function getConstituents() {
  const constituents = await constituentModel.find().lean();

  return {
    total: constituents.length,
    items: constituents,
  };
}
