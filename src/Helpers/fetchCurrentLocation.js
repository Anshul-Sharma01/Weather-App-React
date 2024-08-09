
async function fetchCurrentLocation(){
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Current Location fetched");
                // console.log("Current coordinates : ",[position.coords.latitude, position.coords.longitude]);
                resolve([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                console.log("Error fetching current location of the user");
                reject(error);
            }
        )
    })
}



export default fetchCurrentLocation;





