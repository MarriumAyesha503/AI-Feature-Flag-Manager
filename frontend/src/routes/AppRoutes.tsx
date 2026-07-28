import { Routes, Route } from "react-router-dom";

import { FeatureFlags } from "../pages/FeatureFlagsPage";

export function AppRoutes(){

    return (
        <Routes>
          <Route
                path="/"
                element={<FeatureFlags />}
            />
 
        </Routes>
    )
}