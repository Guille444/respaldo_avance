<?php

// Asegúrate de que $data esté siendo inicializada correctamente
$data = json_decode(file_get_contents('php://input'), true);
// Verifica si $data es null y maneja el error
if (is_null($data)) {
    echo json_encode(['status' => 0, 'session' => 1, 'message' => null, 'error' => 'Datos incompletos o inválidos', 'exception' => null]);
    exit;
}
// Se incluye la clase del modelo.
require_once('../../models/data/citas_data.php');
// Se comprueba si existe una acción a realizar.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $citas = new CitasData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } else {
                    $result['dataset'] = $citas->searchRows($_POST['search']);
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                }
                break;
            case 'createRow':
                file_put_contents('php://stderr', print_r($data, TRUE)); // Log de los datos recibidos

                if (
                    !isset($data['id_vehiculo']) || !is_numeric($data['id_vehiculo']) ||
                    !isset($data['fecha_cita']) || empty($data['fecha_cita']) ||
                    !isset($data['id_servicio']) || !is_array($data['id_servicio']) || empty($data['id_servicio'])
                ) {
                    $result['error'] = 'Datos incompletos o inválidos';
                    file_put_contents('php://stderr', "Datos incompletos o inválidos: " . json_encode($data) . "\n", FILE_APPEND);
                } else {
                    $citas->setIdVehiculo((int)$data['id_vehiculo']);
                    $citas->setFechaCita($data['fecha_cita']);
                    $citas->setIdCliente($_SESSION['idCliente']);
                    $result['status'] = $citas->createRow($data['id_servicio']);
                    if ($result['status']) {
                        $result['message'] = 'Cita creada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al crear la cita';
                    }
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $citas->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen citas registradas';
                }
                break;
            case 'readOne':
                if (!$citas->setId($_POST['id_cita'])) {
                    $result['error'] = 'Cita incorrecta';
                } elseif ($result['dataset'] = $citas->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cita inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$citas->setId($_POST['id_cita']) ||
                    !$citas->setIdVehiculo($_POST['id_vehiculo']) ||
                    !$citas->setFechaCita($_POST['fecha_cita']) ||
                    !isset($_POST['id_servicio']) || empty($_POST['id_servicio']) ||
                    !$citas->setEstado($_POST['estado_cita'])
                ) {
                    $result['error'] = 'Datos incompletos o inválidos';
                } elseif ($citas->updateRow($_POST['id_servicio'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Cita modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la cita';
                }
                break;
            case 'deleteRow':
                if (!$citas->setId($_POST['id_cita'])) {
                    $result['error'] = 'Cita incorrecta';
                } elseif ($citas->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cita eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la cita';
                }
                break;
            case 'getServices':
                // Obtener todos los servicios
                if ($result['dataset'] = $citas->getServices()) {
                    $result['status'] = 1;
                    $result['message'] = 'Servicios cargados correctamente';
                } else {
                    $result['error'] = 'No existen servicios registrados';
                }
                break;
            case 'readAllByClient':
                if (isset($_SESSION['idCliente'])) {
                    try {
                        $result['dataset'] = $citas->readAllByClient();  // Asegúrate de que es un arreglo
                        $result['status'] = 1;
                        $result['message'] = 'Vehículos cargados correctamente';
                    } catch (Exception $e) {
                        $result['error'] = $e->getMessage();
                    }
                } else {
                    $result['error'] = 'No se ha definido el ID del cliente.';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el cliente no ha iniciado sesión.
        $result['error'] = 'Debe iniciar sesión para realizar esta acción';
    }

    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();

    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');

    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
