// Auto-assign category images based on name keywords
const mapping = [
  // bureau/office
  { keywords: ['bureau', 'office'], image: 'uploads/products/images/categories/1766479490-office-decor-office-interior-design.jpeg' },
  // chambre/bedroom
  { keywords: ['chambre', 'bedroom', 'lit', 'nuit'], image: 'uploads/products/images/categories/1766479666-elevate-your-space-with-earthy-elegance-using.jpeg' },
  // cuisine/kitchen
  { keywords: ['cuisine', 'kitchen', 'cuisi'], image: 'uploads/products/images/categories/1766479714-download-18.jpeg' },
  // salon/living/canapé
  { keywords: ['salon', 'living', 'canap'], image: 'uploads/products/images/categories/1766479749-transform-any-space-with-this-luxury-modern-corner.jpeg' },
  // placard/closet/rangement
  { keywords: ['placard', 'rangement', 'wardrobe', 'closet'], image: 'uploads/products/images/categories/1766479794-vous-cherchez-un-placard-qui-peut-non-seulement.jpeg' },
  // décoration/deco
  { keywords: ['d\u00e9coration', 'decor', 'deco'], image: 'uploads/products/images/categories/1766479822-modern-decor-ideas-for-real-modernists-everyday.jpeg' },
  // salle à manger/dining
  { keywords: ['salle', 'manger', 'dining', 'table'], image: 'uploads/products/images/categories/1766479866-download-19.jpeg' },
];

async function main() {
  const categoriesRes = await fetch('http://localhost:3001/categories');
  const categories = await categoriesRes.json();

  console.log(`Found ${categories.length} categories in database`);

  for (const cat of categories) {
    const nameLower = cat.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let matched = null;

    for (const m of mapping) {
      if (m.keywords.some(k => nameLower.includes(k))) {
        matched = m.image;
        break;
      }
    }

    if (matched) {
      console.log(`Assigning to "${cat.name}": ${matched}`);
      await fetch(`http://localhost:3001/categories/${cat.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: matched })
      });
    } else {
      console.log(`No match for "${cat.name}" — skipping`);
    }
  }

  console.log('Done!');
}

main();
