module.exports = function(map) {
    this.correctValues = map;
    this.compare = function(inputValues) {
        let newMap = new Map();

        for (let [key, value] of this.correctValues) {
            if(inputValues.get(key) != value)
                newMap.set(key, false);
            else 
                newMap.set(key, true);
        }
        return newMap;
    }
}
