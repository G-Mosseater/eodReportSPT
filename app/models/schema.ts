import mongoose from "mongoose";

const rowSchema = new mongoose.Schema({
  tourName: { type: String, required: true },
  status: { type: String, required: true },
  hour: { type: String },
  boat: { type: String, default: "" },
  adults: { type: Number, default: 0 },
  groups: { type: Number, default: 0 },
  youth: { type: Number, default: 0 },
  child: { type: Number, default: 0 },
  endurkoma: { type: Number, default: 0 },
  free: { type: Number, default: 0 },
  total: { type: Number, required: true },
});
const paymentSchema = new mongoose.Schema(
  {
    cash: { type: Number, default: 0 },
    card: { type: Number, default: 0 },
    voucher: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    notes: { type: String, default: "" },
  },
  { _id: false },
);

const reportSchema = new mongoose.Schema(
  {
    rows: { type: [rowSchema], required: true },
    payment: paymentSchema,
  },

  { timestamps: true },
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
