const obj = {
    name: "Ana",
    greet: function(){
        //console.log("Hello, "+this.name);
        console.log(`Hello,${this.name}`)
    },
    greet2: () => {
        //can not access this name
        console.log("Hello, "+this.name);
    }
}

obj.name="Maria"

obj.greet = function() {
    console.log("My name is not Maria")
}

obj.greet();