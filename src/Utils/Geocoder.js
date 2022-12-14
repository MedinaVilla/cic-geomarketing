import axios from 'axios';

export const forwardGeocoding = async (address, mapboxApiKey) => {
    return await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + ".json?language=es&country=mx&access_token=" + mapboxApiKey)
    .then((response) => {
        console.log(response);
        if (response.status === 200) {
            if (response.data.features) {
                return { status: 200, message: response.data.features[0]?.center };
            }
        }
        return { status: 200, message: "" };
    }).catch((response) => {
        return { status: response.request.status, message: "No se puede conectar a la API de Mapbox. Contactar a al administrador. CODE: " + response.request.status + " : " + response.code }
    })
}

export const reverseGeocoding = async (positionCords, mapboxApiKey) => {
    return await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + positionCords.lng + "," + positionCords.lat + ".json?language=es&country=mx&access_token=" + mapboxApiKey)
    .then((response) => {
        if (response.status === 200) {
            if (response.data.features) {
                return { status: 200, message: response.data.features[0]?.place_name };
            }
        }
        return { status: 200, message: "" };
    }).catch((response) => {
        return { status: response.request.status, message: "No se puede conectar a la API de Mapbox. Contactar a al administrador. CODE: " + response.request.status + " : " + response.code }
    })
}

