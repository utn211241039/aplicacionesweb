<?php
$nombre = "Olguin Gomez Danna Marial";
$matricula = "211241039";
$fecha = date('Y') . "-" . date('m') . "-" . date('d');
$hora = date('H') . ":" . date('i') . ":" . date('s');
?>
<!DOCTYPE html>
<html lang="es">
<head>
        <meta charset="UTF-8" >
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" >
        <meta name="robots" content="none, noindex, nofollow" />
        <meta name="description" content="<?php echo $matricula; ?>" />
        <meta name="author" content="<?php echo $nombre; ?>" />
        <link href="https://cdn.jsdelivr.net/npm/bootswatch@5.1.0/dist/slate/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous" />
        <link href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.9.0/css/ol.css" rel="stylesheet" crossorigin="anonymous"/>
        <link href="cryptocoins.css" rel="stylesheet" />
        <link href="https://www.utn.red/favicon.png" rel="shortcut icon" type="image/x-icon"/>
        <title><?php echo $nombre.''. $matricula; ?></title>
    </head>
    <body>
        <h2>&nbsp;</h2>
        <div class="container">
            <div class="card text-white bg-dark text-center">
                <div class="card-header">
                    <?php echo $matricula;?>
                </div>
                <div class="card-body">
                   <div class="row justify-content-center">
                    <div class="col-4">
                        <div id="divLista" class="list-group">
                             <a href="javascript: alert('SIN_MONEDAS');" class="list-group-item list-group-item-action">Cargando.....</a>
                        </div>
                    </div>
                    <div class="col-8">
                        <figure class="highcharts-figure">
                            <div id="divGrafica"></div>
                    </figure>
                    <p>&nbsp;</P>
                    <table id= "tableDatos" class="table table-dark table-bordered table-hover table-striped">
                        <caption id="captionDatos" class="text-white"> Crypto</caption>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Apertura</th>
                                <th>Cierre</th>
                                <th>Minimo</th>
                                <th>Maximo</th>
                                <th>Media</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyDatos">
                            <tr>
                                <td colspan = "6">Seleccione una Crypto, primero....</td>
                            </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        <div class="card-footer">
                        <?php echo $fecha.'@'.$hora;?>
                    </div>
            </div>
        </div>
        <h2>&nbsp;</h2>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
        <script src="https://kit.fontawesome.com/c6c9331c4f.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.9.0/build/ol.js"  crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js"></script>

        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js"></script>
        <script src="https://code.highcharts.com/themes/dark-unica.js"></script>
        <script src="cryptocoins.js"></script>
    </body>
</html>