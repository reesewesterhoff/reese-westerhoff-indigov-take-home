import { Router } from "express";
import {
  createUpdateConstituent,
  getAllConstituents,
  exportConstituents,
} from "../controllers/constituentController";

const constituentRoutes = Router();

// POST /api/constituents
constituentRoutes.post("/", createUpdateConstituent);

// GET /api/constituents
constituentRoutes.get("/", getAllConstituents);

// GET /api/constituents/export
constituentRoutes.get("/export", exportConstituents);

export { constituentRoutes };
