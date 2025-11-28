import { image22 , image23,image24,image25,image26,image27,image28,image29,image30,image31,image32,image33,image34,image35,image36} from "../images/images";

const ITEM_IMAGE_MAP = { 
  // Men's items
  'Formal Shirt': image22,
  'T Shirt': image23,
  'Jeans': image24,
  'Trousers': image25,
  'Suit': image26,
  'Jacket': image27,
  'Joggers': image28,
  
  // Women's items
  'Saree': image29,
  'Dress': image30,
  'Blouse': image31,
  'Skirt': image32,
  'Kurti': image33,
  
  // Kids items
  'School Uniform': image36,
  // Note: 'T Shirt' and 'Joggers' are already defined above for men
};

// Fallback images for categories if specific item not found
const CATEGORY_FALLBACK_IMAGES = {
  'man': image22,     // Men's default - Formal Shirt
  'woman': image29,  // Women's default - Saree
  'kids': image36,   // Kids default - School Uniform
};

// Function to get image for an item
export const getItemImage = (itemName, category = '') => {
  if (!itemName) return image22; // Ultimate fallback for empty names
  
  // First try to find exact match
  const exactMatch = ITEM_IMAGE_MAP[itemName];
  if (exactMatch) return exactMatch;
  
  // Try partial matching for common variations
  const lowerItemName = itemName.toLowerCase().trim();
  
  // Men's wear
  if (lowerItemName.includes('formal') && lowerItemName.includes('shirt')) return service6;
  if (lowerItemName.includes('casual') && lowerItemName.includes('shirt')) return service20;
  if (lowerItemName.includes('t-shirt') || lowerItemName.includes('tshirt') || lowerItemName.includes('t shirt')) return service5;
  if (lowerItemName.includes('shirt')) return service6; // General shirt fallback
  
  // Pants & Bottoms
  if (lowerItemName.includes('jeans')) return service11;
  if (lowerItemName.includes('trouser')) return service10;
  if (lowerItemName.includes('jogger')) return service12;
  
  // Formal & Outerwear
  if (lowerItemName.includes('suit')) return service13;
  if (lowerItemName.includes('jacket')) return service14;
  
  // Women's wear
  if (lowerItemName.includes('saree')) return service15;
  if (lowerItemName.includes('dress')) return service7;
  if (lowerItemName.includes('blouse')) return service8;
  if (lowerItemName.includes('skirt')) return service16;
  if (lowerItemName.includes('kurti')) return service17;
  
  // Kids wear
  if (lowerItemName.includes('uniform')) return service19;
  if (lowerItemName.includes('school')) return service19;
  
  // Fallback to category-based image
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }
  
  // Ultimate fallback
  return image22;
};

// Function to transform API data to include images
export const transformCatalogData = (catalogData) => {
  if (!catalogData) return {};
  
  const transformed = {};
  
  Object.keys(catalogData).forEach(serviceType => {
    transformed[serviceType] = {};
    
    Object.keys(catalogData[serviceType]).forEach(category => {
      transformed[serviceType][category] = catalogData[serviceType][category].map(item => ({
        ...item,
        image: getItemImage(item.item, category),
        id: `${serviceType}_${category}_${item.item}`.replace(/\s+/g, '_'),
      }));
    });
  });
  
  return transformed;
};

// Optional: Export the mapping for debugging or other uses
export { ITEM_IMAGE_MAP, CATEGORY_FALLBACK_IMAGES };