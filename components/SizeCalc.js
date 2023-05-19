export default function SizeCalc(bustSize, waistSize) {
    // Define your reference for size matches here
    const sizeReference = [
      { ukSize: 4, bust: 86, waist: 72 },
      { ukSize: 6, bust: 88, waist: 74 },
      { ukSize: 8, bust: 90  , waist: 76 },
      { ukSize: 10, bust: 92, waist: 80 },
      { ukSize: 12, bust: 97, waist: 85 },
      { ukSize: 14, bust: 102, waist: 90 },
      { ukSize: 16, bust: 107, waist: 96 },
      { ukSize: 18, bust: 112, waist: 102 },
      { ukSize: 20, bust: 117, waist: 108 },
      { ukSize: 22, bust: 122, waist: 114 },
    ];
  
    const jacketSize = sizeReference.find((size) => bustSize <= size.bust)?.ukSize;
    const trouserSize = sizeReference.find((size) => waistSize <= size.waist)?.ukSize;

    const result = {
        jacketSize: jacketSize !== undefined ? jacketSize : 22,
        trouserSize: trouserSize !== undefined ? trouserSize : 22
    };

    return result;
  }
  