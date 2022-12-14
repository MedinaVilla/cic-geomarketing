import React, { useEffect, useState, useCallback } from 'react';
import useSupercluster from "use-supercluster";

import { divIcon } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import { iconMarker } from '../MarkerIcon';
import "./ShowMarkersCluster.css";

const icons = {};

const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = divIcon({
      html: `<div class='cluster-marker' style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};

const ShowMarkersCluster = ({ data }) => {
  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }


  const onMove = useCallback(() => {
    updateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    updateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);


  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);


  const points = data.map((crime) => ({
    type: "Feature",
    properties: { cluster: false, crimeId: crime.id, category: crime.category },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.location.longitude),
        parseFloat(crime.location.latitude),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 17 },
  });


  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        // Only one marker
        return (
          <Marker
            key={`marker-${cluster.properties.crimeId}`}
            position={[latitude, longitude]}
            icon={iconMarker}
          />
        );
      })}
    </>
  );
}

export default ShowMarkersCluster;
