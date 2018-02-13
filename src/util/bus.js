function checkFilter(data) {
    const {type, name, checked} = data;// this is destructuring
    
    if (checked) {
        this[type].push(name);
    } else {
        const index = this[type].indexOf(name);
        this[type].splice(index,1);
    }
}

function setDay(day) {
    this.day = day;
}

export {
    checkFilter,
    setDay,
}
