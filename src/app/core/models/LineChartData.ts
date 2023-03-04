  /* Interface for line chart data.
  Example of Line chart data : 
  [
    {
      "name": "Italy",
      "series": [
        {
          "value": 4271,
          "name": "2016"
        },
      ]
    },
  ]*/

import { LineChartParticipation } from "./LineChartParticipation";

  export interface LineChartData{
    [index: number]: LineChartParticipation
}
