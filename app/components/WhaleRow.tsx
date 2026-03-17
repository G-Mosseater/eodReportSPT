import { useState } from "react";

const WhaleRow = () => {
  const [adults, setAdults] = useState(0);
  const [groups, setGroups] = useState(0);
  const [youth, setYouth] = useState(0);
  const [child, setChild] = useState(0);
  const [endurkoma, setEndurkoma] = useState(0);
  const [free, setFree] = useState(0);

  const total = adults + groups + youth + child + endurkoma + free;
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <div className="flex flex-col justify-center">
        <label htmlFor="tour" className="mb-2">
          Tour
        </label>
        <p className="text-lg">Whale Watching</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="hour" className="mb-2">
          Hour
        </label>
        <select
          id="hour"
          name="hour"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Hour</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="17:00">17:00</option>
          <option value="21:00">21:00</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="status" className="mb-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="border rounded px-3 py-2 w-auto max-w-xs focus:ring-2 focus:ring-blue-400"
        >
          <option value="on">On</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="boat" className="mb-2">
          Boat
        </label>
        <select
          id="boat"
          name="boat"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Select boat</option>
          <option value="andrea">Andrea</option>
          <option value="lilja">Lilja</option>
          <option value="rosin">Rosin</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="conditions" className="mb-2">
          Sea Conditions
        </label>
        <select
          id="conditions"
          name="conditions"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Select</option>
          <option value="good">Good</option>
          <option value="rough">Rough</option>
          <option value="very-rough">Very Rough</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="adults" className="mb-2">
          Adults
        </label>
        <input
          type="number"
          onChange={(e) => setAdults(Number(e.target.value))}
          value={adults}
          id="adults"
          name="adults"
          placeholder="0"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-auto max-w-[5rem]"
          min={0}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="adults" className="mb-2">
          Groups
        </label>
        <input
          type="number"
          onChange={(e) => setGroups(Number(e.target.value))}
          value={groups}
          id="groups"
          name="groups"
          placeholder="0"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-auto max-w-[5rem]"
          min={0}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="youth" className="mb-2">
          Youth 7-15
        </label>
        <input
          type="number"
          onChange={(e) => setYouth(Number(e.target.value))}
          value={youth}
          id="youth"
          name="youth"
          placeholder="0"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-auto max-w-[5rem]"
          min={0}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="child" className="mb-2">
          Child 0-6
        </label>
        <input
          type="number"
          onChange={(e) => setChild(Number(e.target.value))}
          value={child}
          id="child"
          name="child"
          placeholder="0"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-auto max-w-[5rem]"
          min={0}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="endurkoma" className="mb-2">
          Endurkoma
        </label>
        <input
          type="number"
          onChange={(e) => setEndurkoma(Number(e.target.value))}
          value={endurkoma}
          id="endurkoma"
          name="endurkoma"
          placeholder="0"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-auto max-w-[5rem]"
          min={0}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="free" className="mb-2">
          Free
        </label>
        <input
          type="number"
          onChange={(e) => setFree(Number(e.target.value))}
          value={free}
          id="free"
          name="free"
          placeholder="0"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-auto max-w-[5rem]"
          min={0}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="total" className="mb-2">
          Total
        </label>
        <input
          type="number"
          value={total}
          readOnly
          id="total"
          name="total"
          placeholder="0"
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-auto max-w-[5rem]"
          min={0}
        />
      </div>
    </div>
  );
};

export default WhaleRow;
