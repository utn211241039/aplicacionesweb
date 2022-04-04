let jsonMonedas = null;
let objetoMoneda = null;
let nombreMoneda = null;
let fechaHoy =  new Date();
let fechaAnterior = moment().subtract(6,'days').toDate();
let htmlNuevo = '';

$(document).ready(
    function(){
        listarMonedas();
        $('#tableDatos').hide();
        moment.locale('es-mx');
    }
);
function listarMonedas(){
    $.ajax({
        url:"https://api.coinpaprika.com/v1/coins",
        success(data){
            pintarMonedas(data);
        },
        error: function(jqXHR,estatusError,textoError){
            alertify.alert('¡Atencion!',`Error:${textoError} <br/>Estatus ${estatusError}`);
        }
    });
}

function pintarMonedas(datos){
    htmlNuevo='';
    jsonMonedas = datos;
    if(jsonMonedas.length > 0 ){
        for(indice = 0; indice < jsonMonedas.length;indice++){
            objetoMoneda = jsonMonedas[indice];
            htmlNuevo += `<a href="javascript: detallar('${objetoMoneda.id}', '${objetoMoneda.name}' );" class="list-group-item list-group-item-action">${objetoMoneda.name}</a>`;
            if(indice >=20){
                break;
            }
        }
    }else{
        htmlNuevo += `<a herf="javascript: alert('SIN_MONEDAS');" class="list-group-item list-group-item-action">Sin monedas</a>`;
        alertify.alert('¡Atencion!','No se recibieron CriptoMonedas.');
    }
    $('#divLista').html(htmlNuevo);
}


    function detallar(idMoneda,nombre)
    {
        nombreMoneda = nombre;
        let inicio = fechaAnterior.toISOString().split('T')[0];
        let fin = fechaHoy.toISOString().split('T')[0];
        let urlMoneda = `https://api.coinpaprika.com/v1/coins/${idMoneda.trim()}/ohlcv/historical?start=${inicio}&end=${fin}`;
        $.ajax({
            url: urlMoneda,
            success(data){
                pintarDatos(data);
            },
            error: function(jqXHR,estatusError,textoError){
                alertify.alert('¡Atencion!',`Error:${textoError} <br/>Estatus ${estatusError}`);
            }
        });
    }

    function pintarDatos(datos) {
        let fechita = null;
        let jsonGraficos = datos;
        let objetoGrafico = null;
        let datosGrafica =  [];
        let etiquetasGrafica = [];
        if(jsonGraficos.length > 0){
            $('#tbodyDatos > tr').remove();
            for(indice = 0; indice < jsonGraficos.length; indice++){
                objetoGrafico = jsonGraficos[indice];
                objetoGrafico.media =parseFloat(( (objetoGrafico.open + objetoGrafico.close)/2).toFixed(2));
                objetoGrafico.low = parseFloat(objetoGrafico.low.toFixed(2));
                objetoGrafico.open = parseFloat(objetoGrafico.open.toFixed(2));
                objetoGrafico.close = parseFloat(objetoGrafico.close.toFixed(2));
                objetoGrafico.high = parseFloat(objetoGrafico.high.toFixed(2));
                datosGrafica.push( [objetoGrafico.low, objetoGrafico.open, objetoGrafico.media,objetoGrafico.close,objetoGrafico.high] );
                fechita = moment (( objetoGrafico.time_open.split('T')[0]), 'YYYY-MM-DD').format('L');
                etiquetasGrafica.push(fechita);
                htmlNuevo = '';
                htmlNuevo += `<tr>`;
                    htmlNuevo += `<td scope="row">${fechita}</td>`;
                    htmlNuevo += `<td>${objetoGrafico.open}</td>`;
                    htmlNuevo += `<td>${objetoGrafico.close}</td>`;
                    htmlNuevo += `<td>${objetoGrafico.low}</td>`;
                    htmlNuevo += `<td>${objetoGrafico.high}</td>`;
                    htmlNuevo += `<td>${objetoGrafico.media}</td>`;
                htmlNuevo += `</tr>`;
                $('#tbodyDatos').append(htmlNuevo);
            }
            fechita = nombreMoneda+ 'del' + moment((fechaAnterior.toISOString().split('T')[0]), 'YYYY-MM-DD').format('L')+ 'al' +moment((fechaHoy.toISOString().split('T')[0]), 'YYYY-MM-DD').format('L');
            $('#captionDatos').html(fechita);
            $('#tableDatos').show();
        }else{
            alertify.alert('¡Atencion!','No se recibieron Datos de la CriptoMoneda.');
            return;   
        }    
    Highcharts.chart('divGrafica',{
        chart: {
            type: 'boxplot'
        },
        title:{
            text: 'Box Plot' + nombreMoneda
        },
        legend:{
            enabled: false
        },
        xAxis: {
            categories: etiquetasGrafica,
            title:{
                text: jsonGraficos.length +  'dias anteriores'
            }
        },
        yAxis:{
            title:{
                text:'Valores'
            }
        },
        series:[{
            name:nombreMoneda,
            data:datosGrafica,
            tooltip:{
                headerFormat: '<em>Fecha {point.key}</em><br/>'
            }
        }]
    });
}