import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import RequestLink from '../pages/auth/RequestLink'
import VerifyLink from '../pages/auth/VerifyLink'
import DefultError from '../component/Errors/DefultError'
import Guest from '../pages/auth/Guest'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Dashboard/DashError'
import DashHome from '../pages/dashboard/DashHome'
import FactoryCreate from '../pages/factories/FactoryCreate'
import Factories from '../pages/factories/Factories'
import PLines from '../pages/factories/PLines'
import CreatePLine from '../pages/factories/CreatePLine'
import Machine from '../pages/Machine/Machine'
import CreateMachine from '../pages/Machine/CreateMachine'



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<RequestLink />} />
                    <Route path='/verify-link' element={<VerifyLink /> } />
                    <Route path='/guest' element={<Guest /> } />

                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><DashError /></PrivateRoute>} />
                
                    <Route index element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><DashHome /></PrivateRoute> } />
                    
                    {/* Factories */}
                    <Route path='factories/create' element={<PrivateRoute roles={['super_admin']} ><FactoryCreate /></PrivateRoute> } />
                    <Route path='factory' element={<PrivateRoute roles={['super_admin']} ><Factories /></PrivateRoute> } />

                    <Route path='Productions/create' element={<PrivateRoute roles={['super_admin']} ><CreatePLine /></PrivateRoute> } />
                    <Route path='Production' element={<PrivateRoute roles={['super_admin']} ><PLines /></PrivateRoute> } />

                    {/* Machine */}
                    <Route path='Machine' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer']} ><Machine /></PrivateRoute> } />
                    <Route path='Machines/create' element={<PrivateRoute roles={['super_admin']} ><CreateMachine /></PrivateRoute> } />
                
                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
