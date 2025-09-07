import ImageMaterials from "../images/materials.jpg";
import ImageWarehouses from "../images/warehouses.jpg";

// Dummy untuk types
const types = [
  { id: 1, name: "Warehouses Management", picture: ImageWarehouses },
  { id: 2, name: "Materials Management", picture: ImageMaterials },
];

const tasks = [
  {
    id: "t1",
    title: "SO - Warehouse Cabang Jakarta",
    binCode: "BIN-001",
    status: "not_started",
  },
  {
    id: "t2",
    title: "SO - Warehouse Cabang Bandung",
    binCode: "BIN-002",
    status: "not_started",
  },
];

// Dummy untuk users
const rounds = [
  { id: 1, check_category: "1" },
  { id: 2, check_category: "2" },
  { id: 3, check_category: "3" },
  { id: 4, check_category: "4" },
  { id: 5, check_category: "5" },
];

// Dummy untuk products
const products = [
  { id: 1, name: "Laptop", price: 15000000 },
  { id: 2, name: "Printer", price: 3000000 },
  { id: 3, name: "Scanner", price: 2000000 },
];

export { products, rounds, tasks, types };
