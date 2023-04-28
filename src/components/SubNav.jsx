import React, { useMemo } from "react";
import DropMenue from "./DropMenue";
import "../style/SubNavbar.css";
import { useSelector } from "react-redux";

const categorizedCategories = [
  {
    name: "Home Appliances",
    items: [],
  },
  {
    name: "Entertainment Electronics",
    items: [],
  },
  {
    name: "Computing and Networking",
    items: [],
  },
  {
    name: "Miscellaneous Electronics",
    items: [],
  },
];

function SubNavbar() {
  const categories = useSelector((state) => state.productCategories);
  const categoryIdsAndNames = useMemo(() => (
    categories.categories?.map((category) => ({ id: category.id, name: category.name }))
  ), [categories.categories]);

  useMemo(() => {
    categorizedCategories[0].items = [];
    categorizedCategories[1].items = [];
    categorizedCategories[2].items = [];
    categorizedCategories[3].items = [];

    categoryIdsAndNames?.forEach((category) => {
      if (
        category.name === "Refrigerators" ||
        category.name === "washing machines" ||
        category.name === "dishwasher machines" ||
        category.name === "microwaves" ||
        category.name === "electric grill machines" ||
        category.name === "electric furnaces " ||
        category.name === "electric ovens" ||
        category.name === "blenders" ||
        category.name === "mixers" ||
        category.name === "Electric Coffee Machines" ||
        category.name === "Drying Machines" ||
        category.name === "Irons" ||
        category.name === "Toasters" ||
        category.name === "Juicers " ||
        category.name === "Vacuum Cleaners" ||
        category.name === "Wet & dry Vacuum Cleaners" ||
        category.name === "water heaters" ||
        category.name === "Dough Mixer Machines " ||
        category.name === "humidifiers"
      ) {
        categorizedCategories[0].items.push({
          id: category.id,
          name: category.name,
        });
      } else if (
        category.name === "TVs" ||
        category.name === "Music Instruments" ||
        category.name === "Cameras"
      ) {
        categorizedCategories[1].items.push({
          id: category.id,
          name: category.name,
        });
      } else if (
        category.name === "Phones" ||
        category.name === "Tablets" ||
        category.name === "Smart Watches" ||
        category.name === "Headphones" ||
        category.name === "Monitors" ||
        category.name === "Motherboards" ||
        category.name === "Routers" ||
        category.name === "Wifi Extenders" ||
        category.name === "Printers" ||
        category.name === "Scanners"
      ) {
        categorizedCategories[2].items.push({
          id: category.id,
          name: category.name,
        });
      } else {
        categorizedCategories[3].items.push({
          id: category.id,
          name: category.name,
        });
      }
    });
  }, [categoryIdsAndNames]);

  return (
    <div className="containerSubNavbar">
      {categorizedCategories?.map((category, index) => (
        <DropMenue key={index} name={category.name} item={category.items} />
      ))}
    </div>
  );
}

export default SubNavbar;
