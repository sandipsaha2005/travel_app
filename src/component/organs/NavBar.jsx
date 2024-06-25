import { useState, useEffect,useContext } from "react"
import { Image } from "../atoms/Image";
import { Button } from "../atoms/Button"
import Logo from "../../assets/logo1.png"
import { NavButtons } from "../particles/DataLists"
import { List } from "../atoms/List";
import {Link } from 'react-router-dom'
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import { Slide } from "react-awesome-reveal";
import { Text } from "../atoms/Text";
import { Context } from '../../main'
import toast from 'react-hot-toast'
import axios from 'axios'

import {Navbar} from '../../test'

const NavBar = () => {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    // const [scrollY, setScrollY] = useState(0)
    const [navBarColor, setNavBarColor] = useState(false)
    const [show,setShow]=useState(false)
    const {isAuthorized,setIsAuthorized,user}= useContext(Context)


    const handleToggle = () => {
        setOpen(!open)
    }

    const listenScrollEvent = () => {
        window.scrollY > 0 ? setNavBarColor(true) : setNavBarColor(false);
    };
    const handleLogout= async()=>{
        try {
            const res=await axios.get("http://localhost:4000/api-v2/user/logout",{withCredentials:true})
            console.log('Logout response:', res)
            toast.success(res?.data?.message)
            setIsAuthorized(false)
            navigate('/login')
        } catch (error) {
            toast.error(" something went wrong");
            setIsAuthorized(true)
        }
        
    }

    const NavLinks = [
        {
            name:'Home',
            url:'/'
        },
        {
            name: "Destination",
            url: "/destinations"
        },
        {
            name: "Hotels",
            url: "/"
        },
        {
            name: "Flights",
            url: "/"
        },
        {
            name: "Bookings",
            url: "/"
        }
        
    ];

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
        
    }, []);
    if(isAuthorized && user.role=='Employer'){
        NavLinks.push({
            name:'Create',
            url: '/creat-epost'
        })
    }
    
    return (
    //     < >
    //     {isAuthorized ?
    //     <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0 ">
    //     <Slide direction="left">
    //         <nav className={`w-full md:h-24 h-20 ${navBarColor ? "bg-white" : "bg-transparent"} lg:px-24 md:px-12 px-8 flex justify-between items-center`}>
    //             {/* <Image as="a" href="/" className="md:h-10 h-8" image={Logo} alt="Logo" /> */}
    //             <Text as="h1" className="font-bold	text-xl">Jadoo</Text>
    //             <div className="lg:flex hidden items-center gap-20">
    //                 <ul className="flex items-center justify-center gap-8">
    //                     {
    //                         NavLinks.map((navlink, index) => (
    //                             <List className="w-full text-base" key={index+1}>
    //                                 <NavLink to={navlink.url} className="relative inline-block overflow-hidden pt-2 pl-2 before:w-2 before:h-2 before:bg-color2 before:absolute before:top-2 before:-left-10 before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0.5 after:w-0.5 after:h-3 after:bg-color2 after:absolute after:left-1 after:-top-10 hover:after:top-3.5 after:transition-all after:duration-200 after:ease-in">{navlink.name}</NavLink>
    //                             </List>
    //                         ))
    //                     }
    //                 </ul>
                    
    //                 <List className="text-gray-950 border-black-7 ">
    //                         EN
    //                     </List>
                       
    //                 <ul className="flex items-center justify-center gap-6">
    //                     { 
    //                         // NavButtons.map((navbutton, index) => (
    //                         //     // <List className="w-full" key={index}>

    //                         //     //     {/*`${navbutton.name === "Signup" ? "border-2 border-gray-950 before:top-0" : "before:bottom-0 border-b-2 border-transparent hover:border-gray-950"} py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-color2 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base` */}

    //                         //     //     {/* <MuiButton variant="contained" color="success" onClick={() => navigate(navbutton.url)} type="button" className=''>{navbutton.name}</MuiButton> */}
    //                         //     // </List>
    //                         // ))
    //                     }
    //                     <button onClick={handleLogout} type="button" className=''>Logout</button>
                        

                        
    //                 </ul>
    //             </div>
    //             <div className="lg:hidden flex gap-4 items-center">
    //                 <div className="border-none outline-none font-light text-sm bg-transparent">
    //                     EN
                        
    //                 </div>
    //                 <div className="hamburger text-gray-950 cursor-pointer" onClick={handleToggle}>
    //                     <CirclesFour size={30} color="currentColor" weight="fill" />
    //                 </div>
    //             </div>
    //         </nav>
    //     </Slide>



    //     {/* Mobile Nav  */}
    //     <nav className={`flex justify-end lg:hidden h-screen w-full bg-gray-950/90 fixed top-0  ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out`}>
    //         <div className={`w-[70%] h-screen bg-white flex flex-col justify-between items-center relative ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out delay-300`}>
    //             <section className="w-full px-4 py-6 flex flex-col gap-16">
    //                 <div className="w-full flex justify-between items-center">
    //                     <Image as="a" href="/" className="md:h-10 h-8" image={Logo} alt="Logo" />
    //                     <div className="hamburger text-gray-950 cursor-pointer" onClick={handleToggle}>
    //                         <ArrowCircleRight size={25} color="currentColor" weight="fill" />
                            
    //                     </div>
    //                 </div>
    //                 <ul className="flex flex-col gap-3 pl-2">
    //                     {
    //                         NavLinks.map((navlink, index) => (
    //                             <List className="w-full text-base" key={index}>
    //                                 <NavLink to={navlink.url} onClick={handleToggle} className={`relative overflow-hidden inline-block before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0 `}>{navlink.name}</NavLink>
    //                             </List>
    //                         ))
    //                     }
                        
    //                 </ul>
                    
    //             </section>
    //             <ul className="w-full flex items-center justify-center pb-24 gap-4">
    //                 {
    //                     NavButtons.map((navbutton, index) => (
    //                         <List className="w-auto" key={index}>
                                
    //                             <Button onClick={() => navigate(navbutton.url)} type="button" className={`${navbutton.name === "Signup" ? "border-2 border-gray-950 before:top-0" : "before:bottom-0 border-b-2 border-white hover:border-gray-950"} py-1.5 px-5 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-color2 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base`}>{navbutton.name}</Button>
    //                             <Button onClick={handleLogout} type="button" className={`${navbutton.name === "Signup" ? "border-2 border-gray-950 before:top-0" : "before:bottom-0 border-b-2 border-white hover:border-gray-950"} py-1.5 px-5 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-color2 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base`}>Logout</Button>
    //                         </List>
    //                     ))
    //                 }
    //                 <Button>Create Post</Button>
    //             </ul>
    //         </div>
    //     </nav>
    // </header >
    // :
    // <></> }
        
    //     </>
    <Navbar/>
    )
}

export default NavBar