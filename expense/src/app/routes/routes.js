import Register from "../pages/auth/register/Register"
import Chat from "../pages/chat/Chat"
import Dashboard from "../pages/dashboard/Dashboard"
import Expense from "../pages/expense/Expense"
import Help from "../pages/help/Help"
export const  routes=[
    {
        path:"/register",
        element:<Register/>,
        protected:false
    },
    {
        path:"/dashboard",
        element:<Dashboard/>,
        protected:true
    },
    {
        path:"/expense",
        element:<Expense/>,
        protected:true
    },
   
     {
        path:"/chat",
        element:<Chat/>,
        protected:true
    },
     {
        path:"/help",
        element:<Help/>,
        protected:true
    },
    {
        path:"/contact",
        element:<Help/>,
        protected:true
    },
]