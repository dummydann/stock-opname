import ImageMaterials from "../images/materials.jpg";
import ImageWarehouses from "../images/warehouses.jpg";

// Dummy untuk types
const types = [
  { id: 1, name: "Warehouses Management", picture: ImageWarehouses, param: 'stype', type: "wm" },
  { id: 2, name: "Materials Management", picture: ImageMaterials, param: 'sloc', type: "mm" },
];

const dataRound = [
  { id: 1, name: "Round 1",},
  { id: 2, name: "Round 2"},
  { id: 3, name: "Round 3"},
  { id: 4, name: "Round 4"},
  { id: 5, name: "Round 5"}
];

const rounds = [
  { id: 1, check_category: "1" },
  { id: 2, check_category: "2" },
  { id: 3, check_category: "3" },
  { id: 4, check_category: "4" },
  { id: 5, check_category: "5" },
];

export { dataRound, rounds, types };

