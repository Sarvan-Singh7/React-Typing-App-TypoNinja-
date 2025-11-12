import React from 'react'
import { useTheme } from '../Context/ThemeContext';
import {                   //as we want these so imported
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';  //Line component for line graph imported

ChartJS.register(   //we have to register these things on ChartJs
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const Graph = ({graphData}) => {
  const {theme} = useTheme();
  return(
    <>
      <Line
         data = {
          {
            labels: graphData.map(i => i[0]),  //x axis represents as Labels so that[ time] in this passed 
            datasets:[          //y axis represents as y axis as it needs object under list
               {
                   data: graphData.map(i => i[1]),   //WPM passed at second index of an array
                   label: 'wpm',
                   borderColor: theme.textColor
               },
               
            ],
          }
         }


      />
    </>
  )
}
export default Graph;