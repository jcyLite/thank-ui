//将对象按子对象的某个key排序
  export function sort(data, key, asc){
    var arr = []
    ,compare = function (obj1, obj2) { 
      var value1 = obj1[key]; 
      var value2 = obj2[key]; 
      if (value2 < value1) { 
        return -1; 
      } else if (value2 > value1) { 
        return 1; 
      } else { 
        return 0; 
      } 
    };
    layui.each(data, function(index, item){
      arr.push(item);
    });
    arr.sort(compare);
    if(asc) arr.reverse();
    return arr;
  };