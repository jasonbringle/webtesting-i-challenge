module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  const enhancement = item.enhancement
  if(enhancement){
    if(enhancement >= 0 && enhancement <= 19){
        enhancement = enhancement + 1
        return item 
      }{ 
          return "Enhancement doesn't exist or is too high or a negative number"
        }
        } else {
            return "This argument is not an object"
          }
}

function fail(item) {
  return { ...item };
}

function repair(item) {
    if(item.hasOwnProperty("durability")){
      if(item.durability >= 0 && item.durability <= 100){
      item.durability = 100
      return item
      } else {
        return 'Durability is not between 0 and 100.'
      }}{
        return 'The durability field is missing..'
      }
}

function get(item) {
  return { ...item };
}
