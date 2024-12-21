const  calculatePrice = (product) => {
    if (product.category === 'A+') return product.size * 20;
    if (product.category === 'A') return product.size * 18;
    if (product.category === 'B') return product.size * 16;
    if (product.category === 'C') return product.size * 12;
    return 0; // Default price if no category matches
  }
  
export { calculatePrice }  