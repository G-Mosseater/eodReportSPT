import mongoose from "mongoose";

const rowSchema = new mongoose.Schema({
  tourName: { type: String, required: true },
  hour: { type: String, required: true },
  boat: { type: String, default: "" },
  adults: { type: Number, default: 0 },
  groups: { type: Number, default: 0 },
  youth: { type: Number, default: 0 },
  child: { type: Number, default: 0 },
  endurkoma: { type: Number, default: 0 },
  free: { type: Number, default: 0 },
  total: { type: Number, required: true },
});

const reportSchema = new mongoose.Schema(
  {
    rows: { type: [rowSchema], required: true },
  },
  { timestamps: true },
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
