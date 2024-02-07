import { LuTreePine, LuSofa } from "react-icons/lu";
import { RiBuilding2Line, RiHotelLine } from "react-icons/ri";
import { HiOutlineHomeModern, HiOutlineBuildingOffice2  } from "react-icons/hi2";
import { TbBeach, TbSchool , TbBuildingEstate, TbAirConditioning, TbTreadmill } from "react-icons/tb";
import {
  GiBarn,
  GiWindmill,
  GiKeyCard
} from "react-icons/gi";
import {
  FaSchool,
  FaSwimmingPool,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
  FaRegBuilding
} from "react-icons/fa";
import { FaPeopleRoof, FaKitchenSet, FaRegHospital  } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
  BiHome,
  BiSolidHotel
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoHome, IoHomeOutline, IoLocationSharp } from "react-icons/io5";
import { MdOutlineFactory, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
  PiAirplaneTiltBold   
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
  GiParkBench
} from "react-icons/gi";
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
    description: "This property is close to the beach!",
  },
  {
    img: "assets/บึงหนองโคตร1.jpg",
    label: "บึงหนองโคตร",
    icon: <GiWindmill />,
    description: "This property is has windmills!",
  },
  {
    img: "assets/กังสดาล1.jpg",
    label: "มข - กังสดาล",
    icon: <HiOutlineBuildingOffice2  />,
    description: "This property is modern!",
  },
  {
    img: "assets/โนนม่วง3.jpg",
    label: "มข - โนนม่วง",
    icon: <TbSchool  />,
    description: "This property is in the countryside!",
  },
  {
    img: "assets/สนามบินขอนแก่น2.jpg",
    label: "สนามบินขอนแก่น",
    icon: <PiAirplaneTiltBold />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "assets/เซ็นทรัลขอนแก่น4.jpg",
    label: "เซ็นทรัลขอนแก่น",
    icon: <RiBuilding2Line />,
    description: "This property is on an island!",
  },
  {
    img: "assets/lake_cat.webp",
    label: "โรงพยาบาลศูนย์ขอนแก่น",
    icon: <FaRegHospital />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "ม.ภาค - บ้านกอก",
    icon: <FaSchool  />,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "ถนนเหล่านาดี - บ้านสะอาด",
    icon: <MdOutlineFactory />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "ศูนย์ราชการ - ทุ่งสร้าง",
    icon: <GiParkBench />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "ศิลา - โกทา",
    icon: <BiHome />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/arctic_cat.webp",
    label: "หนองไผ่ - หนองกุง",
    icon: <GiBarn />,
    description: "This property is in arctic environment!",
  },
  {
    img: "assets/desert_cat.webp",
    label: "หนองหลุบ - บ้านทุ่ม",
    icon: <HiOutlineHomeModern  />,
    description: "This property is in the desert!",
  },
  {
    img: "assets/barn_cat.jpg",
    label: "ท่าพระ - หนองบัวดีหมี",
    icon: <LuTreePine />,
    description: "This property is in a barn!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "โนนตุ๋น - กุดกว้าง",
    icon: <IoHomeOutline />,
    description: "This property is brand new and luxurious!",
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
    name: "หอพัก/โรงแรม",
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
    name: "เซ็งธุรกิจ",
    icon: <FaPeopleRoof />,
  },
  {
    name: "ที่ดิน",
    icon: <IoLocationSharp />,
  },
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
