let checkChismoso = null;
const objetoView = new ol.View(
{
   center: ol.proj.fromLonLat([-98.9865747, 19.4040675]),
   zoom:13
}
);
const objetoMapa = new ol.Map(
    {
        layers: [
            new ol.layer.Tile(
            {
                source: new ol.source.OSM(),
            }
            ),
        ],
        target: 'divMapa',
        view: objetoView,
    }
);
const objetivoGeolocalizador = new ol.Geolocation(
    {
        trackingOptions:
        {
            enableHighAccuracy: true,
        },
        projection: objetoView.getProjection(),
    }
);
$(document).ready ( function()
{
    checkChismoso = document.getElementById("checkUbicacion");
    $( "#checkUbicacion").prop("checked", false);
    checkChismoso?.addEventListener("change", function()
    {
        objetivoGeolocalizador.setTracking(this.checked);
    }
    );
    $('#tableDatos').hide();
}

);
objetivoGeolocalizador.on('change',function()
{
    $('#tableDatos').show();
    $('#spanPrecision').html(objetivoGeolocalizador.getAccuracy()+ '[m]');
    $('#spanAltitud').html(objetivoGeolocalizador.getAltitude()+ '[m]');
    $('#spanPrecisionAltitud').html(objetivoGeolocalizador.getAltitudeAccuracy()+ '[m]');
    $('#spanRumbo').html(objetivoGeolocalizador.getHeading()+ '[rad]');
    $('#spanVelocidad').html(objetivoGeolocalizador.getSpeed()+ '[m/s]');
}
);
objetivoGeolocalizador.on('error', function (error)
{
    alertify.alert('¡Algo no salio bien!', error.message);
}
);

const accuracyFeature = new ol.Feature();
objetivoGeolocalizador.on('change:accuracyGeometry', function()
{
    accuracyFeature.setGeometry(objetivoGeolocalizador.getAccuracyGeometry());
}
);
const positionFeature = new ol.Feature();
positionFeature.setStyle(
                        {
                            imagen: new ol.style.Circle(
                                {
                                    radius: 6,
                                    fill: new ol.style.Fill(
                                        {
                                            color: '#3399CC',
                                        }
                                    ),
                                    stroke: new ol.style.Style.Stroke(
                                        {
                                            color: '#fff',
                                            width: 2,
                                        }
                                    ),
                                }
                            ),
                        }
);
objetivoGeolocalizador.on('change:position', function()
{
    const coordinates = objetivoGeolocalizador.getPosition();
    positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
}
);
new ol.layer.Vector(
    {
        map: objetoMapa,
        source: new ol.source.Vector(
            {
                Features: [accuracyFeature, positionFeature],
            }
        ),
    }
);