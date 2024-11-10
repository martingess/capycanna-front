export function capitalizeFirstLetter(text) {
	try {
	  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	} catch (error) {
	  console.error(error);
	  return text;
	}
  }