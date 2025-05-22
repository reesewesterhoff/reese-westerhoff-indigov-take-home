import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

const AddressSchema: Schema = new Schema(
  {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
); // _id: false because this will be a subdocument

export interface IConstituent extends Document {
  email: string;
  firstName: string;
  lastName: string;
  address: IAddress;
  createdAt: Date;
  updatedAt: Date;
}

const ConstituentSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensure emails are unique
      trim: true,
      lowercase: true, // Store emails in lowercase
      match: [/.+\@.+\..+/, "Please fill a valid email address"], // Basic email validation
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    address: {
      type: AddressSchema,
      default: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Ensure virtuals are included when converting to JSON or Object
ConstituentSchema.set("toJSON", { virtuals: true });
ConstituentSchema.set("toObject", { virtuals: true });

// Mongoose will create a collection named 'constituents' (pluralized and lowercased version of 'Constituent')
export default mongoose.model<IConstituent>("Constituent", ConstituentSchema);
