import { Request, Response } from "express";
import ConstituentModel, { IConstituent } from "../models/constituentModel"; // Using path alias defined in tsconfig.json
import { getConstituents } from "../utilities/getConstituents";
import { json2csv } from "json-2-csv";

/**
 * @description Create or update a constituent
 * @route POST /api/constituents
 * @access Public
 */
export const createUpdateConstituent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, firstName, lastName, address } = req.body;

    // Email must be present
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    // Check if the constituent already exists
    const existingConstituent = await ConstituentModel.findOne({ email });
    if (existingConstituent) {
      // Update the existing constituent
      // Ensure idempotency (only replace fields that have been passed in)
      existingConstituent.firstName =
        firstName || existingConstituent.firstName;
      existingConstituent.lastName = lastName || existingConstituent.lastName;
      existingConstituent.address.street =
        address?.street || existingConstituent.address.street;
      existingConstituent.address.city =
        address?.city || existingConstituent.address.city;
      existingConstituent.address.state =
        address?.state || existingConstituent.address.state;
      existingConstituent.address.postalCode =
        address?.postalCode || existingConstituent.address.postalCode;
      existingConstituent.address.country =
        address?.country || existingConstituent.address.country;

      const updatedConstituent = await existingConstituent.save();
      res.status(200).json(updatedConstituent);
      return;
    }

    const newItem: IConstituent = new ConstituentModel({
      email,
      firstName,
      lastName,
      address,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating item:", error);
  }
};

/**
 * @description Get all constituents
 * @route GET /api/constituents
 * @access Public
 */
export const getAllConstituents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { items } = await getConstituents();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

/**
 * @description Export all constituents to CSV
 * @route GET /api/constituents/export
 * @access Public
 */
export const exportConstituents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Didn't get all the way through this functionality - WIP
    const { items } = await getConstituents();
    const csv = json2csv(items);

    res.set({
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="data.csv"',
    });
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error exporting constituents:", error);
  }
};
