import mongoose from "mongoose";

const rowSchema = new mongoose.Schema({
  tourName: { type: String, required: true },
  status: { type: String, required: true },
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
const paymentSchema = new mongoose.Schema(
  {
    cash: { type: Number, default: 0 },
    card: { type: Number, default: 0 },
    voucher: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    notes: { type: String, default: "" },
    g11: { type: Number, default: 0 },
    ae5: { type: Number, default: 0 },
    receptionStaff: { type: String, default: "" },
    guides: { type: String, default: "" },
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

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
});

const privateRequestSchema = new mongoose.Schema(
  {
    tourName: { type: String, required: true },
    company: { type: String, required: true },
    pax: { type: Number, required: true },
    boat: { type: String, required: true },
    date: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

const PrivateRequest =
  mongoose.models.PrivateRequest ||
  mongoose.model("PrivateRequest", privateRequestSchema);
const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export { Report, User, PrivateRequest };
