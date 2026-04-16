"use client";

import { useState } from "react";
import { postPrivateRequest } from "../../lib/api";

type Props = {
  tourName: string;
  boatOptions: string[];
};

export default function PrivateTourForm({ tourName, boatOptions }: Props) {
  const [company, setCompany] = useState("");
  const [pax, setPax] = useState(0);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [boat, setBoat] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = {
      tourName,
      company,
      pax,
      date,
      notes,
      boat,
      email,
    };
    console.log(formData)
    try {
      await postPrivateRequest(formData);
      
      setCompany("");
      setPax(0);
      setDate("");
      setNotes("");
      setBoat("");
      setEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 md:p-8 mt-8 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        Request Private Tour
      </h2>

      <div className="flex flex-col">
        <label className="text-sm mb-1">Company Name</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Number of Pax</label>
        <input
          type="number"
          min={1}
          value={pax}
          onChange={(e) => setPax(Number(e.target.value))}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Boat</label>
        <select
          value={boat}
          onChange={(e) => setBoat(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
        >
          <option value="">Select boat</option>

          {boatOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Preferred Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1">Additional Details</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="border rounded px-3 py-2 focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#1E73BE] text-white py-2 rounded hover:bg-[#155a96] transition"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
