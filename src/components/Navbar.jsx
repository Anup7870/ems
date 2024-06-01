import React, { useState } from "react";
import { Button, ButtonGroup, Avatar } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { MdArrowRightAlt } from "react-icons/md";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
   const [isLogged, setIsLogged] = useState(true);
   const [avatarClicked, setAvatarClicked] = useState(false);
   const navigate = useNavigate();
   return (
      <div className='w- px-8 py-2 border-b border-darkBlue bg-card'>
         <nav className='w-full flex justify-between items-center'>
            <img
               src={logo}
               alt='logo'
               srcset=''
               className=' w-14 h-14 rounded-full object-cover'
            />
            {isLogged ? (
               <ButtonGroup>
                  <Button
                     leftIcon={<FiMail />}
                     colorScheme='teal'
                     variant='solid'>
                     Contact Us
                  </Button>
                  <Button
                     rightIcon={<MdArrowRightAlt />}
                     colorScheme='teal'
                     variant='outline'
                     onClick={() => navigate("/login")}>
                     Log In
                  </Button>
               </ButtonGroup>
            ) : (
               <>
                  <Avatar
                     name='Dan Abrahmov'
                     src='https://bit.ly/dan-abramov'
                     onClick={() => setAvatarClicked(!avatarClicked)}
                     className=' cursor-pointer'
                  />
                  {avatarClicked ? (
                     <div className='absolute top-16 px-1 py-1 right-0 bg-white w-32 border border-dark-gray rounded-lg shadow-md'>
                        <ul className=' cursor-pointer'>
                           <li>Log Out</li>
                        </ul>
                     </div>
                  ) : null}
               </>
            )}
         </nav>
      </div>
   );
}