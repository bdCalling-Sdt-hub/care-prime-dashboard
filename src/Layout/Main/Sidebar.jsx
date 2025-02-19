import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { PiCopyBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbBulbFilled } from "react-icons/tb";
import { HiTicket } from "react-icons/hi2";
import { IoNewspaper } from "react-icons/io5";
import { IoBriefcase } from "react-icons/io5";
import MainLogo from "../../assets/MainLogo.png"
import { BiPackage } from "react-icons/bi";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <RxDashboard size={24} />,
      label: <Link to="/">Analytics</Link>,
    },
    {
  key: "/category",
  icon: <PiCopyBold size={24} />,
  label: <Link to="/category">Category</Link>,
},

    {
      key: "/insight",
      icon: <TbBulbFilled size={24} />,
      label: <Link to="/insight">Insightful Tips</Link>,
    },
    {
      key: "/blogs",
      icon: <IoNewspaper size={24} />,
      label: <Link to="/blogs">Blogs</Link>,
    },
    {
      key: "/medicalhistory",
      icon: <IoBriefcase size={24} />,
      label: <Link to="/medicalhistory">Medical History</Link>,
    },
    {
      key: "/packagesplans",
      icon: <BiPackage size={24} />,
      label: <Link to="/packagesplans">Packages</Link>,
    },
    {
      key: "/subscription",
      icon: <HiTicket size={24} />,
      label: <Link to="/subscription">Subscription</Link>,
    },

    {
      key: "subMenuSetting",
      icon: <IoSettingsOutline size={24} />,
      label: "Settings",
      children: [
        {
          key: "/profile",
          label: (
            <Link to="/profile" className="text-white hover:text-white">
              Personal Information
            </Link>
          ),
        },
        {
          key: "/faq",
          label: (
            <Link to="/faq" className="text-white hover:text-white">
              Frequently Asked Question
            </Link>
          ),
        },
        {
          key: "/terms-and-conditions",
          label: (
            <Link
              to="/terms-and-conditions"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="h-full ">
      <Link to={"/"} className=" flex items-center  justify-center py-4 px-6">
       <img src={MainLogo} alt="logo" />
      </Link>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
        className="space-y-5 "
      />
    </div>
  );
};

export default Sidebar;
