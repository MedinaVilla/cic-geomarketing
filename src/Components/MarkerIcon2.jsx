import { Icon, Point } from 'leaflet';


const iconMarker2= new Icon({
    iconUrl: require("./../Assets/Images/marker-guinda.png"),
    iconRetinaUrl: require("./../Assets/Images/marker-guinda.png"),
    iconAnchor: [10, 45], // point of the icon which will correspond to marker's location
    iconSize: new Point(20, 35),
});

export { iconMarker2 };