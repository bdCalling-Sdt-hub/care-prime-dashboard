import React from 'react'
import { imageUrl } from '../../redux/api/baseApi';
import { Link } from 'react-router-dom';
import { FaRegBell } from 'react-icons/fa6';
import { Badge } from 'antd';
import { useUser } from '../../provider/User';
import { useGetUserQuery } from '../../redux/apiSlices/authSlice';

const Header = () => {
    const { data: user, isLoading } = useGetUserQuery();
    // console.log(user)
    // const {user}  = useUser();
    const src = user?.data?.profile?.startsWith("https")
      ? user?.data?.profile
      : `${imageUrl}/${user?.data?.profile}`;
    return (
        <div className='flex items-center gap-5 justify-end'>
            <Link to="/notification" className='h-fit mt-[10px]'> 
                <Badge count={5} >
                    <FaRegBell color="#6C57EC" size={24}/>
                </Badge>
            </Link>
            <Link to="/profile" className='flex  items-center gap-3'>   
            
                <img
                    style={{ 
                        clipPath: "circle()",
                        width: 45,
                        height: 45
                    }}
                    src={src}
                    alt="person-male--v2"
                    className='clip object-cover'
                />
                <p>{user?.firstName} {" "} {user?.lastName}</p>
            </Link>

        </div>
    )
}

export default Header