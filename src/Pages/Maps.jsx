// import React from 'react';
// import Anexo1 from "./../Assets/Images/Mapa_1.jpg";
// import Anexo2 from "./../Assets/Images/Mapa_2.jpg";
// import Anexo3 from "./../Assets/Images/Mapa_3.jpg";
// import Anexo4 from "./../Assets/Images/Mapa_4.jpg";
// import Anexo5 from "./../Assets/Images/Mapa_5.jpg";
// import Anexo6 from "./../Assets/Images/Mapa_6.jpg";


// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

// const Maps = () => {
//     return (
//         <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
//             <div style={{ width: "45vw", height:"80vh" }}>
//                 <Carousel>
//                     <div >
//                         <img src={Anexo1} alt="anexo1" />
//                     </div>
//                     <div >
//                         <img src={Anexo2} alt="anexo2" />
//                     </div>
//                     <div >
//                         <img src={Anexo3} alt="anexo3" />
//                     </div>
//                     <div >
//                         <img style={{maxHeight:"600px"}} src={Anexo4} alt="anexo4" />
//                     </div>
//                     <div >
//                         <img src={Anexo5} alt="anexo5" />
//                     </div>
//                     <div >
//                         <img src={Anexo6} alt="anexo6" />
//                     </div>

//                 </Carousel>
//             </div>
//         </div>
//     );
// }

// export default Maps;


import React from 'react';
import Anexo1 from "./../Assets/Images/Mapa_1.jpg";
import Anexo2 from "./../Assets/Images/Mapa_2.jpg";
import Anexo3 from "./../Assets/Images/Mapa_3.jpg";
import Anexo4 from "./../Assets/Images/Mapa_4.jpg";
import Anexo5 from "./../Assets/Images/Mapa_5.jpg";
import Anexo6 from "./../Assets/Images/Mapa_6.jpg";

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import styles from "./../styles/Maps.module.css";

const Maps = () => {
    return (
        <div className={styles.container}>
        <Carousel navButtonsAlwaysVisible fullHeightHover={false} autoPlay={false}>
            <Paper >
                <img style={{ width: "100%" }} src={Anexo1} alt="anexo1"/>
            </Paper>
            <Paper >
                <img style={{ width: "100%" }} src={Anexo2}  alt="anexo2"/>
            </Paper>
            <Paper >
                <img style={{ width: "100%" }} src={Anexo3}  alt="anexo3"/>
            </Paper>
            <Paper >
                <img style={{ width: "100%" }} src={Anexo4}  alt="anexo4"/>
            </Paper>
            <Paper >
                <img style={{ width: "100%" }} src={Anexo5}  alt="anexo5"/>
            </Paper>
            <Paper >
                <img style={{ width: "100%" }} src={Anexo6}  alt="anexo6"/>
            </Paper>
            
        </Carousel>
    </div>
    );
}

export default Maps;
