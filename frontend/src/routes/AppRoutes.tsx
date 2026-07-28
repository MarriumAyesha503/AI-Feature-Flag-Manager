import { Routes, Route } from "react-router-dom";

import { FeatureFlags } from "../pages/FeatureFlagsPage";
import {CreateFeatureFlag} from "../pages/CreateFeatureFlagPage";

export function AppRoutes(){

    return (
        <Routes>
          <Route
                path="/"
                element={<FeatureFlags />}
            />

            <Route
                path="/create-flag"
                element={<CreateFeatureFlag />}
            />
 
        </Routes>
    )
}