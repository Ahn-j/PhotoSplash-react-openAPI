import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/index";
import BookMark from "@pages/bookmark/index";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/:id/*" element={<MainPage />}></Route>
          <Route path="/bookmark" element={<BookMark />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
