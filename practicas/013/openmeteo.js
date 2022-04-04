let jsonDatos = null;
let jsonFechas = null;
let objetoDato = null;
let objetoFecha = null;
let jsonEtiquetas= null;
let fechaHoy = new Date();
let htmlNuevo = '';

$(document).ready(
    function()
    {
        listarDatos();
        $('#tableDatos').hide();
        moment.locale('es-mx');
    }
);
function listarDatos()
{
    $.ajax({
        url:"https://api.open-meteo.com/v1/forecast?latitude=19.4271&longitude=-99.1276&hourly=windspeed_10m",
        success(data){
            pintarDatos(data);
        },
        error: function(jqXHR,estatusError,textoError){
            alertify.alert('¡Atencion!',`Error:${textoError} <br/>Estatus ${estatusError}`);
        }
    });
}

function pintarDatos(datos)
{
    jsonDatos = datos.hourly.windspeed_10m;
    jsonFechas = datos.hourly.time;
    jsonEtiquetas = jsonFechas.map(function(valor){
        return moment((valor.split('T')[0]),'YYYY-MM-DD').format('L')+' '+ valor.split('T')[1];
    });
    if(jsonDatos.length > 0 ){
        $('#tbodyDatos >tr').remove();
        for(indice = 0;indice<jsonDatos.length;indice++){
            objetoDato=jsonDatos[indice];
            objetoFecha=jsonFechas[indice];
            htmlNuevo = '';
            htmlNuevo += '<tr>';
                htmlNuevo+=`<td scope="row">'${moment((objetoFecha.split('T')[0]),'YYYY,MM,DD').format('LL')}</td>`;
                htmlNuevo+=`<td>${objetoFecha.split('T')[1]}</td>`;
                htmlNuevo+=`<td>${objetoDato}</td>`;
            htmlNuevo+=`</tr>`;
            $('#tbodyDatos').append(htmlNuevo);
        }
        let arraycito = jsonDatos.map(function(valor){
            return parseFloat(valor);
        });
        let maximo = Math.max(...arraycito);
        let minimo = Math.min(...arraycito);
        let suma = arraycito.reduce((previo,actual)=> previo += actual);
        let promedio = suma/arraycito.length;
        let caption ='';
        caption+=`Minima: <strong>${minimo}</strong><br/>`;
        caption+=`Maxima: <strong>${maximo}</strong><br/>`;
        caption+=`Promedio: <strong>${promedio.toFixed(2)}</strong>`;
        $('#captionDatos').html(caption);
        $('#tableDatos').show();
    }else{
        alertify.alert('¡Atencion!','No se recibieron Datos del clima.');
        return;
    }
    Highcharts.chart('divGrafica',{
        title:{
            text: 'Pronostico del Tiempo'
        },
        subtitle:{
            text: 'Fuente: Weather Forecast API'
        },
        yAxis: {
            title:{
                text: 'kms/hora'
            }
        },
        xAxis:{
            tickInterval:20,
            categories: jsonEtiquetas
        },
        legend:{
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions:{
            series:{
                label:{
                    connectorAllowed: false
                }
            }
        },
        series:[{
            name:'Viento',
            data:jsonDatos,
            color: '#FF0000',
            tooltip:{
                headerFormat: '<em>Fecha {point.key}</em><br/>'
            }
        }],
        responsive:{
            rules:[{
                condition:{
                    maxWidth:500
                },
                charOptions:{
                    legend:{
                        layout:'horizontal',
                        align:'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}