import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MAPBOX_KEY } from '../Config/Constants';
import axios from "axios";
// import ShowMarkersCluster from '../Components/ClusterData/ShowMarkersCluster';
import { iconMarker } from '../Components/MarkerIcon';
import styles from "./../styles/Home.module.css";

import * as L from 'leaflet';
import 'leaflet.markercluster';
// import dataCSV from "./../Components/ClusterData/Delitos_Genero_Preproceso.json";


import { CircularProgress } from '@material-ui/core';
require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");

const mapboxUriTileLayer = "https://api.mapbox.com/styles/v1/medinavilla/cl6v5mk8w000t14mtzhgb5kbd/tiles/256/{z}/{x}/{y}@2x?access_token=" + MAPBOX_KEY

export default function Home() {
    const mapRef = useRef(null);
    const [zoom] = useState(11);
    const [markers, setMarkers] = useState([]);
    const [markerSelected, setMarkerSelected] = useState();


    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    const showContentMarkerAside = async (marker) => {
        // marker.sourceTarget.latlng = marker.latlng;
        // if (showAside) { // Si ya estan mostrados los delitos, no hacer ninguna transicion
            setMarkerSelected(marker.sourceTarget.data);
            mapRef.current.flyTo(marker.latlng)

            // marker.openPopup();

        // } else {
        //     // setShowAside(true);
        //     mapRef.current.flyTo(marker.latlng, 18)
        //     setMarkerSelected(marker.sourceTarget.data);
        //     setTransitionOn(true);
        // }
    }

    /* Obrenemos los delitos de genero de nuestra API*/
    useEffect(() => {
        async function fetchData() {
            axios.get("http://localhost:8081/negocios").then((response) => {
                // console.log(response)
                if (response.data && !response.data.errno) {
                    setMarkers(response.data)
                } else{
                    console.log(response.data)
                }
                setLoadingData(false)
            }).catch((error) => {
                alert(error.message);
                setLoadingData(false)
            })
        }
        fetchData();
    }, [])


    /* Listeners que siempre estara pendiente del cualquier cambio del tamaño del mapa para hacer un RESIZE*/
    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 200);
        }
    }, [mapRef])


    /* Convertimos los marcadores en un formato legible para el mapa*/
    const points = markers.map((data, id) => {
        if (!isNaN(data.longitud) && !isNaN(data.latitud)) {
            return ({
                type: "Feature",
                properties: { cluster: false, data: data },
                geometry: {
                    type: "Point",
                    coordinates: [
                        parseFloat(data.longitud),
                        parseFloat(data.latitud),
                    ],
                },
            })
        } else return {}
    });



    const renderCluster = (map) => {
        setTimeout(
            () => {
                const markers = L.markerClusterGroup({
                    maxClusterRadius: 90,
                    disableClusteringAtZoom: 18,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    chunkedLoading: true
                })


                
                points.map((point) => {
                    let marker = L.marker([point.geometry.coordinates[1], point.geometry.coordinates[0]], { icon: iconMarker })
                    marker.data = point.properties.data
                    marker.bindPopup(point.properties.data.nom_estab);
                    marker.addTo(markers);
                })


                markers.on('click', function (marker) {
                    showContentMarkerAside(marker);
                });

                markers.addTo(map.target);

                mapRef.current._layersMaxZoom = 18;
                setLoading(false);
            }, 500
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mapContainer}>
                {!loadingData ? <MapContainer
                    id="mymap"
                    center={[19.432608, -99.133209]}
                    zoom={zoom}
                    ref={mapRef}
                    style={{ height: '100%', width: "100%" }}
                    whenReady={(map) => { renderCluster(map); }
                    }
                >
                    <TileLayer
                        url={mapboxUriTileLayer}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer> : ""}
                {
                    (loading) && <div className={styles.circularProgress}>
                        <CircularProgress color="secondary" />
                    </div>
                }
            </div>
            {/* <div className={[showAside ? styles.animated : "", styles.aside]} 
                onTransitionEnd={() => {
                    setTransitionOn(false);
                    // mapRef.current.flyTo(markerSelected.latlng, 18)
                }
                }>
                {
                    markerSelected && <div>
                        <div className={styles.container}>
                            <Alert severity="error" icon={false}>
                                Delito: <strong>{markerSelected.Delito}</strong> <br/>
                                Edad: <strong>{markerSelected.Edad}</strong><br/>
                                Fecha/Hora hecho: <strong>{markerSelected.FechaHecho} {markerSelected.HoraHecho}</strong><br/>
                            </Alert>
                        </div>
                    </div>
                }
            </div> */}
        </div >
    )
}