import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';


export default function ChartCard(props){
    return(
      <Card elevation={3}>
        <CardHeader
          title={props.title}
          subheader={props.info}
        ></CardHeader>
        <CardContent>
          
          <Chart
            type={props.type}
            data={props.state}
            options={{
              title:{
                display:false,
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </CardContent>
      </Card>
    );
}
