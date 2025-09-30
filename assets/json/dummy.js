import ImageMaterials from "../images/materials.jpg";
import ImageWarehouses from "../images/warehouses.jpg";

// Dummy untuk types
const types = [
  { id: 1, name: "Materials Management", picture: ImageMaterials, param: 'sloc', type: "mm" },
  { id: 2, name: "Warehouses Management", picture: ImageWarehouses, param: 'stype', type: "wm" },
];

const dataRound = [
  { id: 1, name: "Round I",},
  { id: 2, name: "Round II"},
  { id: 3, name: "Round III"},
  { id: 4, name: "Round IV"},
  { id: 5, name: "Round V"}
];

const rounds = [
  { id: 1, check_category: "1" },
  { id: 2, check_category: "2" },
  { id: 3, check_category: "3" },
  { id: 4, check_category: "4" },
  { id: 5, check_category: "5" },
];

export { dataRound, rounds, types };

