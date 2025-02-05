import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBoatFishing,
  GiCactus,
  GiFamilyHouse,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
  FaHome,
  FaUsers,
} from "react-icons/fa";

import { FaKitchenSet, FaBed } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsPersonWorkspace } from "react-icons/bs";
import {
  MdOutlineVilla,
  MdMicrowave,
  MdBalcony,
  MdYard,
  MdPets,
} from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";


export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
    color: "#bfdbfe", // blue-200
  },
 {
    label: "Urban Areas",
    icon: <MdOutlineVilla />,
    color: "#ffe4b5", // light beige
  },
  {
    label: "Seaside Properties",
    icon: <TbBeach />,
    color: "#e9d5ff", // purple-200
  },
  {
    label: "Hill Stations",
    icon: <TbMountain />,
    color: "#d1fae5", // green-200
  },
  {
    label: "Rural Areas",
    icon: <GiWindmill />,
    color: "#d1fae5", // green-200
  },
  {
    label: "Lakeside Properties",
    icon: <GiBoatFishing />,
    color: "#bfdbfe", // blue-200
  },
  {
    label: "Metro Cities",
    icon: <MdOutlineVilla />,
    color: "#fef3c7", // yellow-200
  },

 
  {
    label: "Heritage Properties",
  icon: <GiIsland />,
    color: "#f5a9a9", // soft red
  },
 
  {
    label: "Resorts & Villas",
    icon: <GiWindmill />,

    color: "#d3f9e2", // pale green
  },
];


export const types = [
  {
    name: "Whole Home",
    description: "Enjoy complete privacy with the entire home to yourself.",
    icon: <FaHome />,
  },
  {
    name: "Private Room",
    description: "Relax in your own room while sharing common areas.",
    icon: <FaBed />,
  },
  {
    name: "Guest Suite",
    description:
      "Experience comfort in a private suite within a larger property.",
    icon: <GiFamilyHouse />,
  },
  {
    name: "Shared Apartment",
    description: "Stay in a cozy apartment with shared facilities.",
    icon: <FaUsers />,
  },
];

export const facilities = [
  {
    name: "Luxury Bathtub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Premium Care Essentials",
    icon: <FaPumpSoap />,
  },
  {
    name: "Al Fresco Shower",
    icon: <FaShower />,
  },
  {
    name: "Efficient Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "High-Performance Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Clothing Hangers",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Ironing Essentials",
    icon: <TbIroning3 />,
  },
  {
    name: "Smart TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Home Office Space",
    icon: <BsPersonWorkspace />,
  },
  {
    name: "Climate Control - AC",
    icon: <BsSnow />,
  },
  {
    name: "Central Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Surveillance Cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Safety Fire Extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "Emergency First Aid Kit",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "High-Speed Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Complete Cooking Set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Large Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave Oven",
    icon: <MdMicrowave />,
  },
  {
    name: "Electric Stove",
    icon: <GiToaster />,
  },
  {
    name: "Outdoor BBQ Grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Open-Air Dining",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Private Terrace/Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Campfire Experience",
    icon: <GiCampfire />,
  },
  {
    name: "Lush Garden",
    icon: <MdYard />,
  },
  {
    name: "Complimentary Parking",
    icon: <AiFillCar />,
  },
  {
    name: "Contactless Check-In",
    icon: <FaKey />,
  },
  {
    name: "Pet-Friendly Space",
    icon: <MdPets />,
  },
];
