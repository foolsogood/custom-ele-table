export const fns = {
    "function(){return Array.prototype.reduce.call(arguments,(a,b)=>a+b)}": "function(){return Array.prototype.reduce.call(arguments,(a,b)=>floatAdd(a,b))}",
    "function(a,b){return((a/b)*c)}": "function(a,b){return(floatMul((floatDiv(a,b),c))}",
    "function(a,b){return(100*(a-b)/b)}": "function(a,b){return(100*floatDiv(floatAdd(a,-b),b))}",
    "function(a,b){return(a/b)}": "function(a,b){return(floatDiv(a,b))}",
    "function(a,b){return(a+b)}": "function(a,b){return(floatAdd(a,b))}",
    "function(a,b,c){return((a-b)/c)}": "function(a,b,c){return(floatDiv(floatAdd(a,-b),c))}",
    "function(a,b,c){return(a+b-c)}": "function(a,b,c){return(floatAdd(floatAdd(a,b),-c))}",
    "function(a,b,c){if((a+b)<c)) {return false }return(a+b-c)}": "function(a,b,c){if(a+b<c){return false}return(floatAdd(floatAdd(a,b),-c))}"
};
export default fns;
//# sourceMappingURL=fns.js.map