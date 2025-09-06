// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/JS/Login';
import SignUp from './pages/JS/SignUp';
import Home from './pages/JS/Home';
import Contact from './pages/JS/Contact_Us';
import 'leaflet/dist/leaflet.css';
import AdminMessages from './pages/JS/adminmesage';

import Privacy from './pages/JS/Privacy_Policy';
import AdminNavbar from './pages/JS/components/Admin_navbar';
import AdminHome from './pages/JS/Admin';
import ForgetPassword from './pages/JS/forget_password';
import EditProfile from './pages/JS/edit_profile';
import BrowseMovies from './pages/JS/browser_moveis';
import RegisterTicket from './pages/JS/register_ticket';
import AdminTicketPage from './pages/JS/registered_ticket';
import AddMovie from './pages/JS/add_movies';
import DonorManagement from './pages/JS/donot_managment';
import DonorPage from './pages/JS/donor_page';
import BecomeDonor from './pages/JS/register_donor';
import DonorList from './pages/JS/see_donor';
import AboutUs from './pages/JS/About_us';
import DonorsList from './pages/JS/create_donor_list';
import UsersList from './pages/JS/create_user_list';
import Notifications from './pages/JS/donor_recived_notification';
import ViewProfile from './pages/JS/view_profile';
import DonorListt from './pages/JS/donorlist';
function App() {
  return (
    <Router>

      <div className="app-container">
      <Routes>
            <Route path="/" element={<Home/>} />


            {<Route path="/SignUp" element={<SignUp />} />
            
            }

{<Route path="/donor_recived_notification" element={<Notifications />} />
            
            }




{<Route path="/donorlist" element={<DonorListt />} />
            
            }

{<Route path="/view_profile" element={<ViewProfile />} />
            
            }


{<Route path="/create_user_list" element={<UsersList />} />
            
          }
            {<Route path="/create_donor_list" element={<DonorsList />} />
            
          }




 {<Route path="/adminmesage" element={<AdminMessages />} />
            
          }





       {<Route path="/register_donor" element={<BecomeDonor />} />
            
          }
          {<Route path="/donot_managment" element={<DonorManagement />} />
            
          }

{<Route path="/About_us" element={<AboutUs />} />
            
          }

             {<Route path="/see_donor" element={<DonorList />} />
            
          }


{<Route path="/donor_page" element={<DonorPage />} />
            
          }
              {<Route path="/browser_moveis" element={<BrowseMovies />} />
            
          }
            {<Route path="/add_movies" element={<AddMovie />} />
            
          }
             {<Route path="/edit_profile" element={<EditProfile />} />
            
          }
     
            {<Route path="/registered_ticket" element={<AdminTicketPage />} />
            
          }
            {<Route path="/register_ticket" element={<RegisterTicket />} />
            
          }
            {<Route path="/Login" element={<Login />} />
            
            


          }
           {<Route path="/Admin" element={<AdminHome />} />
            
            

          }
            

{<Route path="/forget_password" element={<ForgetPassword />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
              {<Route path="/Home" element={<Home />} />
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
             {<Route path="/Admin_navbar" element={<AdminNavbar />} />
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
                
            
                {<Route path="/Contact_Us" element={<Contact />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
          
                
               
          
                  {<Route path="/Privacy_Policy" element={<Privacy />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }


          </Routes>

        <div className="main-content">
        
        </div>
      </div>
    </Router>
  );
}

export default App;
