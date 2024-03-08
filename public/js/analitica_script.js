var ctx= document.getElementById("myChart").getContext("2d");
var myChart= new Chart(ctx,{
    type:"line",
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
        datasets: [{
            label: 'Numero de Reviews',
            data: [500, 400,700, 332, 235, 743, 647, 567, 893],
            backgroundColor: [
                'rgb(50, 133, 168)',
                'rgb(50, 91, 168)',
                'rgb(50, 66, 168)'
            ],
            borderColor: 'rgb(50, 121, 168)',
            fill: false,
            lineTension: 0.1,
        }]
    },
    options:{
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero: true
                }
            }]
        }
    }
});