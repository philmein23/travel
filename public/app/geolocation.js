(function(module) {
    var getGeolocation = {};
    getGeolocation.getLocation = function() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          getGeolocation.latitude = position.coords.latitude;
          getGeolocation.longitude = position.coords.longitude;
        });
      } else {
        console.log("Geolocation is not supported");
      }
    };


module.getGeolocation = getGeolocation;

})(window);
