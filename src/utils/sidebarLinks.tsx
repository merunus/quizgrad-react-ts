import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms, FaListAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import { IoMdCreate } from "react-icons/io";
type TLinks = {
  id: number;
  text: string;
  path: string;
  icon: JSX.Element;
};

const links: TLinks[] = [
  {
    id: 1,
    text: "My modules",
    path: "/",
    // icon: <IoBarChartSharp />,
    icon: <BsLayoutTextWindowReverse />,
  },
  {
    id: 2,
    text: "Create module",
    path: "create-module",
    icon: <IoMdCreate />,
  },
  {
    id: 3,
    text: "Profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    id: 4,
    text: "All modules",
    path: "all-modules",
    icon: <MdQueryStats />,
  },
];

export default links;
