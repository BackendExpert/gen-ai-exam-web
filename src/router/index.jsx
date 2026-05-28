import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import RequestLink from '../pages/auth/RequestLink'
import VerifyLink from '../pages/auth/VerifyLink'
import DefultError from '../component/Errors/DefultError'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Dashboard/DashError'
import Unauthorized from './Unauthorized'
import Users from '../pages/Dashboard/users/Users'
import CreateNewUser from '../pages/Dashboard/users/CreateNewUser'
import ViewUser from '../pages/Dashboard/users/ViewUser'
import Roles from '../pages/Dashboard/roles/Roles'
import ViewRole from '../pages/Dashboard/roles/ViewRole'
import CreateNewRole from '../pages/Dashboard/roles/CreateNewRole'
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

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'lecturer', 'student', 'staff']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'lecturer', 'student', 'staff']} ><DashError /></PrivateRoute>} />
                
                    {/* <Route index element={<PrivateRoute roles={['super_admin', 'lecturer', 'student', 'staff']} ><DashHome /></PrivateRoute> } /> */}
                   
                    {/* user management */}
                    <Route path='users' element={<PrivateRoute roles={['super_admin', 'staff']} ><Users /></PrivateRoute> } />
                    <Route path='create-user' element={<PrivateRoute roles={['super_admin', 'staff']} ><CreateNewUser /></PrivateRoute> } />
                    <Route path='users/:id' element={<PrivateRoute roles={['super_admin', 'staff']} ><ViewUser /></PrivateRoute> } />

                    {/* role management */}
                    <Route path='roles' element={<PrivateRoute roles={['super_admin']} ><Roles /></PrivateRoute> } />
                    <Route path='roles/:id' element={<PrivateRoute roles={['super_admin']} ><ViewRole /></PrivateRoute> } />
                    <Route path='create-role' element={<PrivateRoute roles={['super_admin']} ><CreateNewRole /></PrivateRoute> } />



                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
