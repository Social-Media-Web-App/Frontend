const msToTime = (s) =>  {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    if(hrs > 24){
      if(Math.floor(hrs/24) > 1)
      return hrs/24 + ' days ago';
      else
      return Math.floor(hrs/24) + ' day ago'
    }
    else if(hrs < 24 && hrs > 0){
      if(hrs > 1)
      return hrs + ' hours ago';
      else
      return hrs + ' hour ago'
    }
    else if(mins  > 0){
      if(mins > 1)
      return mins + ' minutes ago';
      else
      return mins + ' minute ago'
    }
    else if(secs  > 0){
      if(secs > 1)
      return secs + ' seconds ago';
      else
      return secs + ' second ago'
    }
    else return null;
    /* return hrs + ':' + mins + ':' + secs + '.' + ms; */
  }

  export default msToTime;