"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
  onCreate: (formData: FormData) => void;
};

export default function CreatePetModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("type", type);
    formData.set("notes", notes);

    await onCreate(formData);

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Create New Pet</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pet name"
            required
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Pet type"
            required
            className="w-full border rounded p-2"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="w-full border rounded p-2"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
