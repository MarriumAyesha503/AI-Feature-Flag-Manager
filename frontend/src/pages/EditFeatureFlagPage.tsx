import { useState, useEffect } from "react";
import api from "../api/client";
import type { FeatureFlag } from "../types/featureFlag";

interface EditFeatureFlagProps{
  open: boolean;
  onClose: () => void;
  selectedFlag: FeatureFlag | null;
 setFlags: React.Dispatch< React.SetStateAction<FeatureFlag[]>>;
}

export function EditFeatureFlag({ open, onClose, selectedFlag, setFlags }: EditFeatureFlagProps) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [enabled, setEnabled] = useState(false);


    useEffect(() => {

        if (selectedFlag) {
        setName(selectedFlag.name);
        setDescription(selectedFlag.description);
        setEnabled(selectedFlag.enabled);
        }

    }, [selectedFlag]);


    const updateFlag = async () => {
        if (!selectedFlag) return;

        try {
        const response = await api.patch( `/feature-flags/${selectedFlag.id}`, { name, description, enabled } );
        setFlags(prev => prev.map(flag => flag.id === selectedFlag.id ? response.data : flag ) );
        onClose();


        } catch(error) {
            console.error( "Failed to update feature flag", error ); }
    };

    if (!open || !selectedFlag) {
        return null;
    }

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-[450px] p-6">
        <h2 className="text-2xl font-bold mb-5"> Edit Feature Flag </h2>

        <label className="block text-sm font-medium mb-1"> Name </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4" />

        <label className="block text-sm font-medium mb-1"> Description </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value) } className="w-full border rounded-lg px-3 py-2 mb-4" rows={3} />

        <div className="flex items-center justify-between mb-6">
          <span className="font-medium"> Enabled </span>
          <button onClick={() => setEnabled(!enabled)} className={`w-14 h-7 rounded-full p-1 transition ${ enabled ? "bg-green-500" : "bg-gray-300" }`} >
            <div className={`bg-white w-5 h-5 rounded-full transition-transform ${ enabled ? "translate-x-7" : "" }`} />
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg" > Cancel </button>
          <button onClick={updateFlag} className="px-4 py-2 bg-blue-600 text-white rounded-lg" > Save </button>
        </div>


      </div>

    </div>

  );
}