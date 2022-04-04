<?php
$nombre = "Olguin Gomez Danna Marial";
$matricula = "211241039";
$fecha = date('Y') . "-" . date('m') . "-" . date('d');
$hora = date('H') . ":" . date('i') . ":" . date('s');
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none, noindex, nofollow" />
    <meta name="description " content="<?php echo $matricula; ?>" />
    <meta name="author" content="<?php echo $nombre; ?> " />
    <link href="https://cdn.jsdelivr.net/npm/bootswatch@5.1.0/dist/slate/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous " />
    <link href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" rel="stylesheet" />
    <link href="gatos.css" rel="stylesheet" />
    <link href="https://www.utn.red/favicon.png" rel="shortcut icon" type="image/x-icon">
    <title><?php echo $nombre . ' ' . $matricula; ?></title>
</head>

<body>
    <h2>&nbsp;</h2>
    <div class="container">
        <div class="card text-while bg-dark text-center">
            <div class="card-header">
                <?php echo $matricula; ?>
            </div>
            <div class="card-body">
                <div class="row justify-content-center">
                    <div class="col-4">
                        <div id="divLista" class="list-group">
                            <a href="javascript: alert('SIN GATOS');" class="list-group-item list-group-item-action">Cargando. . .</a>
                        </div>
                    </div>
                    <div class="col-8">
                        <img id="imgGato" src="https://www.antonio.com.mx/imagenes/gato.png" class="img-fluid" alt="Gatos">
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <?php echo $fecha . '@' . $hora; ?>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" crossorigin="anonymous"> </script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js " crossorigin="anonymous"> </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js " crossorigin="anonymous"> </script>
    <script src="https://kit.fontawesome.com/c6c9331c4f.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"> </script>
    <script src="gatos.js"></script>

</body>
</html>