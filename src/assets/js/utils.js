export const loadEventImg = (value, minWidth, maxWidth, ratio = "16_9") => {
    const allowedExstensions = ["jpg", "jpeg", "png", "webp"];

    if(!("images" in value)) 
      return "https://placehold.co/600x400?text=Billetltyst"

    const foundImg = value.images.find((img) => img.ratio === ratio && (img.width < maxWidth && img.width > minWidth))
      
    if(!foundImg || !("url" in foundImg))
      return "https://placehold.co/600x400?text=Billetltyst"
      
    const imgSplit = foundImg.url.split(".");

    if(!allowedExstensions.includes(imgSplit.pop())) {
      return "https://placehold.co/600x400?text=Billetltyst"
    }
    return foundImg.url;
  }

export const formatDateNO = (value) => {
    return value.split("-").reverse().join(".");
  }