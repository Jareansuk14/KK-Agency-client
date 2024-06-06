import { LuTreePine, LuSofa } from "react-icons/lu";
import { RiBuilding2Line, RiHotelLine } from "react-icons/ri";
import { HiOutlineHomeModern, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbBeach, TbSchool, TbBuildingEstate, TbAirConditioning, TbTreadmill } from "react-icons/tb";
import { GiBarn, GiWindmill, GiKeyCard } from "react-icons/gi";
import { FaSchool, FaSwimmingPool, FaFireExtinguisher, FaRegBuilding } from "react-icons/fa";
import { FaPeopleRoof, FaKitchenSet, FaRegHospital } from "react-icons/fa6";
import { BiSolidWasher, BiSolidDryer, BiSolidFirstAid, BiWifi, BiSolidFridge, BiWorld, BiHome, BiSolidHotel } from "react-icons/bi";
import { BsFillDoorOpenFill, } from "react-icons/bs";
import { IoHome, IoHomeOutline, IoLocationSharp } from "react-icons/io5";
import { MdOutlineFactory, MdMicrowave, MdPets } from "react-icons/md";
import { PiBathtubFill, PiTelevisionFill, PiAirplaneTiltBold } from "react-icons/pi";
import { GiCctvCamera, GiParkBench } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "ทั้งหมด",
    icon: <BiWorld />,
  },
  {
    img: "assets/บึงแก่น1.jpg",
    label: "บึงแก่นนคร",
    icon: <TbBeach />,
  },
  {
    img: "assets/บึงหนองโคตร1.jpg",
    label: "บึงหนองโคตร",
    icon: <GiWindmill />,
  },
  {
    img: "assets/กังสดาล1.jpg",
    label: "มข - กังสดาล",
    icon: <HiOutlineBuildingOffice2 />,
  },
  {
    img: "assets/โนนม่วง3.jpg",
    label: "มข - โนนม่วง",
    icon: <TbSchool />,
  },
  {
    img: "assets/สนามบินขอนแก่น2.jpg",
    label: "สนามบินขอนแก่น",
    icon: <PiAirplaneTiltBold />,
  },
  {
    img: "assets/เซ็นทรัลขอนแก่น4.jpg",
    label: "เซ็นทรัลขอนแก่น",
    icon: <RiBuilding2Line />,
  },
  {
    img: "assets/lake_cat.webp",
    label: "ร.พ.ศูนย์ขอนแก่น",
    icon: <FaRegHospital />,
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "ม.ภาค - บ้านกอก",
    icon: <FaSchool />,
  },
  {
    img: "assets/castle_cat.webp",
    label: "เหล่านาดี - บ้านสะอาด",
    icon: <MdOutlineFactory />,
  },
  {
    img: "assets/cave_cat.jpg",
    label: "ศูนย์ราชการ - ทุ่งสร้าง",
    icon: <GiParkBench />,
  },
  {
    img: "assets/camping_cat.jpg",
    label: "ศิลา - โกทา",
    icon: <BiHome />,
  },
  {
    img: "assets/arctic_cat.webp",
    label: "หนองไผ่ - หนองกุง",
    icon: <GiBarn />,
  },
  {
    img: "assets/desert_cat.webp",
    label: "หนองหลุบ - บ้านทุ่ม",
    icon: <HiOutlineHomeModern />,
  },
  {
    img: "assets/barn_cat.jpg",
    label: "ท่าพระ - หนองบัวดีหมี",
    icon: <LuTreePine />,
  },
  {
    img: "assets/lux_cat.jpg",
    label: "โนนตุ่น - กุดกว้าง",
    icon: <IoHomeOutline />,
  },
];

export const types = [
  {
    name: "บ้านเดี่ยว",
    icon: <IoHome />,
  },
  {
    name: "คอนโด",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "ทาวน์เฮ้าส์",
    icon: <TbBuildingEstate />,
  },
  {
    name: "หอพัก โรงแรม",
    icon: <BiSolidHotel />,
  },
  {
    name: "อาคารพาณิชย์",
    icon: <RiHotelLine />,
  },
  {
    name: "สำนักงาน",
    icon: <FaRegBuilding />,
  },
  {
    name: "เซ้งธุรกิจ",
    icon: <FaPeopleRoof />,
  },
  {
    name: "ที่ดิน",
    icon: <IoLocationSharp />,
  },
];

export const prices = [
  {label: "น้อยกว่า 5,000"},
  {label: "5,000 - 10,000"},
  {label: "10,000 - 15,000"},
  {label: "15,000 - 20,000"},
  {label: "20,000 - 30,000"},
  {label: "30,000 ++"},
];

export const facilities = [
  {
    name: "อ่างอาบน้ำ",
    icon: <PiBathtubFill />,
  },
  {
    name: "เครื่องซักผ้า",
    icon: <BiSolidWasher />,
  },
  {
    name: "เครื่องอบผ้า",
    icon: <BiSolidDryer />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "เครื่องปรับอากาศ",
    icon: <TbAirConditioning />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "ถังดับเพลิง",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "ชุดปฐมพยาบาลเบื้องต้น",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "เครื่องครัว",
    icon: <FaKitchenSet />,
  },
  {
    name: "ตู้เย็น",
    icon: <BiSolidFridge />,
  },
  {
    name: "ไมโครเวฟ",
    icon: <MdMicrowave />,
  },
  {
    name: "Fully furnished",
    icon: <LuSofa />,
  },
  {
    name: "สระว่ายน้ำ",
    icon: <FaSwimmingPool />,
  },
  {
    name: "ฟิตเนส",
    icon: <TbTreadmill />,
  },
  {
    name: "ฟรีที่จอดรถ",
    icon: <AiFillCar />,
  },
  {
    name: "คีย์การ์ด",
    icon: <GiKeyCard />
  },
  {
    name: "อนุญาตให้เลี้ยงสัตว์",
    icon: <MdPets />
  }
];
