import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import RequestLink from '../pages/auth/RequestLink'
import VerifyLink from '../pages/auth/VerifyLink'
import DefultError from '../component/Errors/DefultError'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Dashboard/DashError'
import Unauthorized from './Unauthorized'
// import DashHome from '../pages/dashboard/DashHome'




function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<RequestLink />} />
                    <Route path='/verify-link' element={<VerifyLink /> } />
                    <Route path='/unauthorized' element={<Unauthorized /> } />
                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><DashError /></PrivateRoute>} />
                
                    {/* <Route index element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><DashHome /></PrivateRoute> } /> */}
                   
                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
