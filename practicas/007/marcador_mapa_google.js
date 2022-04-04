//Esta llave es unica y se crea dentro de Google Developers
const API_KEY_MAPAS= "AIzaSyB_J4epzoFpebr141X62BTqu5Oy2DnRYnk"
let map;
let utnLab;
let marcador;

//creacion del script y llamado
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key?${API_KEY_MAPAS}&callback=initMap';
script.async = true;

//adjuntar la llamada al mapa para su uso
window.initMap= function(){
    utnLab = { lat: 19.4040032, lng: -98.9880654 };
    map = new google.maps.Map(document.getElementById("divMapaGoogle"),{
        center : utnLab,
        zoom: 19.54,

    });
    marcador = new google.maps.Marker({
        position : utnLab,
        map:map,
    });
    
};
document.head.appendChild(script);