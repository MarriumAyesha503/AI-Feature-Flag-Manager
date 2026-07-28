import { useEffect, useState } from "react";
import api from "../api/client";
import {CreateFeatureFlag} from "./CreateFeatureFlagPage";
import type { FeatureFlag } from "../types/featureFlag";
import { EditFeatureFlag } from "./EditFeatureFlagPage";


export function FeatureFlags(){

  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState<FeatureFlag | null>(null);
  const [editOpen, setEditOpen] = useState(false);

    const toggleFlag = async (id: number, enabled: boolean) => {
      try {
        await api.patch(`/feature-flags/${id}`, { enabled: !enabled });
        setFlags(prev => prev.map(flag => flag.id === id ? { ...flag, enabled: !enabled } : flag ) );
      } catch (error) {
        console.error("Failed to update flag", error);
      }
  };

    const deleteFlag = async (id: number) => {
      try {
        await api.delete(`/feature-flags/${id}`);
        setFlags(prev => prev.filter(flag => flag.id !== id) );
      } catch (error) {
        console.error("Failed to delete flag", error);
      }
  };

    useEffect(() => {
        api.get("/feature-flags") .then(response => { setFlags(response.data); })
          .catch(error => { console.error(error); });
    }, []);

 return (
    <div className="min-h-screen bg-slate-100 p-8">

 <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Feature Flags
            </h1>
          </div>

          <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"         onClick={() => setOpen(true)}
            onClick={() => setIsOpen(true)}> + Create Flag </button>
              <CreateFeatureFlag open={isOpen} onClose={() => setIsOpen(false)}  setFlags={setFlags}/>
        </div>

        {/* Search */}
        <div className="mb-4 flex gap-4">
          <input placeholder="Search flags..." className="flex-1 rounded-lg border bg-white px-4 py-2" />

          <select className="rounded-lg border bg-white px-4 py-2">
            <option>All Environments</option>
            <option>Development</option>
            <option>Staging</option>
            <option>Production</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-slate-50 text-left text-sm text-slate-600">
              <tr>
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4">Rollout</th>
                <th className="px-6 py-4">Environment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {flags.map((flag) => (
                <tr
                  key={flag.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {flag.name}
                  </td>

                  <td className="px-6 py-4">
                    {flag.rollout_percentage}%
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {flag.environment}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {flag.name}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFlag(flag.id, flag.enabled)}
                      className={`relative h-6 w-11 rounded-full transition ${ flag.enabled ? "bg-green-500" : "bg-gray-300" }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${ flag.enabled ? "left-5" : "left-0.5" }`}
                      />
                    </button>
                  </td>

                                    <td className="px-6 py-4 text-slate-500">
                    {flag.name}
                  </td>
                  
                  <td className="px-6 py-4 space-x-3">
                    <button className="text-blue-600 hover:underline" onClick={() => { setSelectedFlag(flag); setEditOpen(true); }} > Edit </button>
                          <EditFeatureFlag open={editOpen} selectedFlag={selectedFlag} onClose={() => { setEditOpen(false); setSelectedFlag(null); }} setFlags={setFlags} />
                    <button className="text-red-600 hover:underline" onClick={() => deleteFlag(flag.id)}> Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>  
     </div>
  );
}