import { Route, Routes } from "react-router";
import Settings from "./features/settings/Settings";
import Profile from "./features/settings/Profile";
import Account from "./features/settings/Account";
import Appearance from "./features/settings/Appearance";
import Notifications from "./features/settings/Notifications";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Settings />}>
        <Route path="profile" element={<Profile />} />
        <Route path="account" element={<Account />} />
        <Route path="appearance" element={<Appearance />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default App;
