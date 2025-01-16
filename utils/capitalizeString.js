const capitalize = (str) => {
    return str
      .split(" ") // String ko words mein split karna
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Har word ka pehla letter capitalize aur baqi lowercase karna
      .join(" "); // Words ko wapas ek string mein join karna
  };


  export {
    capitalize,
  }