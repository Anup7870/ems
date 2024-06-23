import React, { useState } from "react";
import { Button, ButtonGroup, Avatar } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { MdArrowRightAlt } from "react-icons/md";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
   const [isLogged, setIsLogged] = useState(true);
   const [avatarClicked, setAvatarClicked] = useState(false);
   const { user } = useSelector((state) => state.user);
   const navigate = useNavigate();

   return (
      <div className='w-full px-8 py-2 border-b border-darkBlue fixed top-0 bg-white '>
         <nav className='w-full flex justify-between items-center z-10 '>
            <img
               src={logo}
               alt='logo'
               srcset=''
               className=' w-9 h-9 md:w-14 md:h-14 rounded-full object-cover'
            />
            {!user ? (
               <ButtonGroup>
                  <Button
                     leftIcon={<FiMail />}
                     colorScheme=''
                     variant='solid'
                     className='bg-[#ff407d]  hover:bg-white hover:text-black hover:border hover:border-[#ff407d]'>
                     Contact Us
                  </Button>
                  <Button
                     rightIcon={<MdArrowRightAlt />}
                     // colorScheme='teal '
                     // variant='outline'
                     className='border border-[#ff407d] !bg-white hover:!bg-[#ff407d] hover:text-white'
                     onClick={() => navigate("/login")}>
                     Log In
                  </Button>
               </ButtonGroup>
            ) : (
               <>
                  <Avatar
                     name='Dan Abrahmov'
                     src={user.image.userImage}
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
