const returnsTime = (timeCreated) => {
    const dateCreated = new Date(timeCreated);
    const currentTime = new Date();
    
    let difference = Math.abs(currentTime - dateCreated)
    const years = difference/ (1000 * 60 * 60 * 24 * 365)
    const months = difference/ (1000 * 60 * 60 * 24 * 30.42)
    const days = difference/ (1000 * 60 * 60 * 24)
    const hours = difference/ (1000 * 60 * 60)
    const min = difference/ (1000 * 60)
    const sec = difference/ (1000 )
    
    if(years >= 1){
        return `${Math.ceil(years)} years ago`
    }else if(months >= 1){
        return `${Math.ceil(months)} months ago`
    }else if(days >= 1){
        return `${Math.ceil(days)} days ago`
    }else if(hours >= 1){
        return `${Math.ceil(hours)} hours ago`
    }else if(min >= 1){
        return `${Math.ceil(min)} min ago`
    }else if(sec >= 1){
        return `${Math.ceil(sec)} seconds ago`
    }
}

export default returnsTime;