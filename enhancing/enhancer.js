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
  if(item.hasOwnProperty("enhancement")){
    if(item.enhancement < 15){
      item.durability = item.durability - 5
      return item
    } else{
        if(item.enhancement >= 15  && item.enhancement <= 16){
          item.durability = item.durability - 10
          return item
        } else{
          if(item.enhancement > 16){
            item.enhancement = item.enhancement - 1
            return item
          }
        }
        return item
      }
  } else {
    return "Item is not an object"
  }
}

function repair(item) {
  if(item.hasOwnProperty("durability")){
    if(item.durability >= 0 && item.durability <= 100){
      item.durability = 100
      return item
    } else{
      return 'Durability is not between 0 and 100.'
    }
  } else {
    return  'The durability field is missing..'
  }
}

function get(item) {
  if(item.enhancement == 0){
    return item
  } else{
    if(item.enhancement > 0){
      item.name = `[+${item.enhancement}] ${item.name}`
      return item
    }
  }
  return item;
}
