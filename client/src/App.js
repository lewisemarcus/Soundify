import { Landing, Register, Error, SharedLayout, ProtectedRoute } from "./pages"
import AddSong from "./pages/dashboard/AddSong"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landing/LandingPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <SharedLayout />
                        </ProtectedRoute>
                    }
                >
                    
                    <Route index element={<div>stats</div>} />
                    <Route path="all-jobs" element={<div>all jobs</div>} />
                    <Route path="add-job" element={<div>add job</div>} />
                    <Route path="profile" element={<div>profile</div>} />
                </Route>
                
                <Route path="/register" element={<Register />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/upload" element={<AddSong />} />
                <Route path="*" element={<Error />} />
                <Route path="/landingpage" element={<LandingPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
