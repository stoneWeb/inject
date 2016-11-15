'use strict';
const angular = {
  _module: {},
  _parseArgs (fn) {
    let args = fn.toString().match(/^(?:[^\\(]+)?\(([^\\)]+)\)/)
    if(!args){
      return []
    }
    return args[1]
            .split(",")
            .map(item => this._module[item.trim()])
  },
  factory (key, fn) {
    this._module[key] = fn.apply(null, this._parseArgs(fn))
    return this
  },
  service (key, fn) {
    this._module[key] = new (
      Function.prototype.bind.apply(fn, [null].concat(this._parseArgs(fn)))
    )
    return this
  },
  controller (fn) {
    fn.apply(null, this._parseArgs(fn))
    return this
  }
}

angular
  .factory("$http", () => {
    return { name: "Lei" }
  })
  .service("$location", function($http){
    this.name = $http.name
  })
  .controller(($location, $http) => {
    console.log($location, $http);
  })
