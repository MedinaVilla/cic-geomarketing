import React, { useEffect, useState } from 'react';
import ChartC from '../Components/ChartCard';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';

export default function Estadistica() {
  const [negociosDelegacion, setNegociosDelegacion] = useState()
  const [clinicasDelegacion, setClinicasDelegacion] = useState()
  const [categorias, setCategorias] = useState()
  
  useEffect(() => {
    async function fetchData() {
        axios.get("http://localhost:8081/negocios/graph1").then((response) => {
          console.log(response)
            let labels = [];
            let data = [];
            response.data.map((negocio) => {
                labels.push(negocio.municipio);
                data.push(parseInt(negocio.count));
                return true;
            })
            setNegociosDelegacion({
                title: "Negocios por delegación en la Ciudad de México",
                info: "Número de negocios por delegación",
                type: "bar",
                state: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Negocios",
                            backgroundColor: "rgba(153, 102, 155, 1)",
                            borderColor: "rgba(153, 102, 155, 1)",
                            borderWidth: 2,
                            data: data
                        }
                    ],
                },

            });
        }).catch((error) => {
            console.log(error)
        })
    }
    fetchData();
}, [])

useEffect(() => {
    async function fetchData() {
        axios.get("http://localhost:8081/negocios/graph2").then((response) => {
          console.log(response)
            let labels = [];
            let data = [];
            response.data.map((negocio) => {
                labels.push(negocio.municipio);
                data.push(parseInt(negocio.count));
                return true;
            })
            setClinicasDelegacion({
                title: "Clínicas por delegación en la Ciudad de México",
                info: "Número de clínicas por delegación",
                type: "bar",
                state: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Clínicas",
                            backgroundColor: "#FFC000",
                            borderColor: "#FFC000",
                            borderWidth: 2,
                            data: data
                        }
                    ],
                },

            });
        }).catch((error) => {
            console.log(error)
        })
    }
    fetchData();
}, [])

useEffect(() => {
    async function fetchData() {
        axios.get("http://localhost:8081/negocios/graph3").then((response) => {
          console.log(response)
            let labels = [];
            let data = [];
            response.data.map((negocio) => {
                labels.push(negocio.categoria);
                data.push(parseInt(negocio.count));
                return true;
            })
            setCategorias({
                title: "Categorías de los negocios en la Ciudad de México",
                info: "Número negocios por categoría",
                type: "doughnut",
                state: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Categorías",
                            // borderColor: "#FFD700",
                            // borderWidth: 2,
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 205, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(201, 203, 207, 1)',

                                'rgba(225, 99, 132, 1)',
                                'rgba(215, 159, 64, 1)',
                                'rgba(185, 205, 86, 1)',
                                'rgba(155, 192, 192, 1)',
                                'rgba(125, 162, 235, 1)',
                                'rgba(103, 102, 255, 1)',
                                'rgba(21, 203, 207, 1)',

                                'rgba(5, 99, 132, 1)',
                                'rgba(1, 149, 64, 1)',
                                'rgba(4, 105, 86, 1)',
                            ],
                        }
                    ],
                },

            });
        }).catch((error) => {
            console.log(error)
        })
    }
    fetchData();
}, [])
  return (
    <Container sx={{ m: "2rem" }}>
      <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    {negociosDelegacion && <ChartC title={negociosDelegacion.title} info={negociosDelegacion.info} state={negociosDelegacion.state} type={negociosDelegacion.type}></ChartC>}
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    {clinicasDelegacion && <ChartC title={clinicasDelegacion.title} info={clinicasDelegacion.info} state={clinicasDelegacion.state} type={clinicasDelegacion.type}></ChartC>}
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    {categorias && <ChartC title={categorias.title} info={categorias.info} state={categorias.state} type={categorias.type}></ChartC>}
                </Grid>
            </Grid>
    </Container>
  )
}
