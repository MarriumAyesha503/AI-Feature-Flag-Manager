import { useState } from "react";
import api from "../api/client";
import type { FeatureFlag } from "../types/featureFlag";

interface CreateFeatureFlagProps{
  open: boolean;
  onClose: () => void;
  setFlags: React.Dispatch< React.SetStateAction<FeatureFlag[]>>;
}

export function CreateFeatureFlag({ open, onClose, setFlags }: CreateFeatureFlagProps) {

          const [name, setName] = useState("");
          const [featureKey, setFeatureKey] = useState("");
          const [description, setDescription] = useState("");
          const [enabled, setEnabled] = useState(true);
          const [rollout, setRollout] = useState(25);

          const handleSubmit = async () => {
            const newFlag = {
              name: name,
              feature_key: featureKey,
              description: description,
              enabled,
              rollout_percentage: rollout,
              project_id: 1
            };

              try {
                    const response = await api.post("/feature-flags/create", newFlag);
                    setFlags((previousFlags) => [ ...previousFlags, response.data]);
                    alert("Feature flag created!");
                     onClose();
              } catch (err) {
                  console.error(err);
              }
};

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">

          <div className="flex items-center justify-between border-b px-8 py-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Create Feature Flag
              </h2>
            </div>

            <button
              onClick={onClose}
              className="text-3xl text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 p-8">

            <div className="lg:col-span-2 space-y-6">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Feature Name
                </label>

                <input
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="New Dashboard" onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Feature Key
                </label>

                <input
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="new_dashboard" onChange={(e) => setFeatureKey(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <textarea
                  rows={3}
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Describe this feature..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Toggle */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-semibold">
                    Feature Enabled
                  </h3>
                </div>
                <button
                  onClick={() => setEnabled(!enabled)} className={`relative h-7 w-14 rounded-full transition  ${ enabled ? "bg-green-500" : "bg-slate-300" }`} >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${enabled ? "left-8" : "left-1" }`}
                  />
                </button>

              </div>

              {/* Slider */}

              <div>

                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    Rollout Percentage
                  </span>

                  <span>{rollout}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rollout}
                  onChange={(e) =>
                    setRollout(Number(e.target.value))
                  }
                  className="w-full"
                />

              </div>

            </div>

            {/* Right */}

            <div className="rounded-xl bg-slate-50 p-5">

              <h3 className="font-semibold text-lg">
                🤖 AI Assistant
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Describe your feature and AI will
                generate a suggested configuration.
              </p>

              <textarea
                rows={5}
                className="mt-4 w-full rounded-lg border p-3"
                placeholder="Enable new checkout for premium users..."
              />

              <button
                className="mt-4 w-full rounded-lg bg-purple-600 py-3 text-white hover:bg-purple-700" > Generate </button> 
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t px-8 py-5">
            <button onClick={onClose}  className="rounded-lg border px-5 py-2 hover:bg-slate-100" > Cancel </button>
            <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700" onClick={handleSubmit} > Create </button>
          </div>

        </div>
      </div>
    </>
  );
}