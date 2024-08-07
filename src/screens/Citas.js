import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../../utils/constantes';

export default function Citas({ navigation }) {
  const ip = Constantes.IP; // Obtiene la IP del servidor desde las constantes

  const [fecha, setFecha] = useState(new Date());
  const [modo, setModo] = useState('date');
  const [mostrar, setMostrar] = useState(false);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [vehiculo, setVehiculo] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Citas</Text>
        </View>
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      cargarVehiculos();
      cargarServicios();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      // Limpiar los campos cuando la pantalla se enfoque
      setFecha(new Date());
      setVehiculo('');
      setServiciosSeleccionados([]);
    }, [])
  );

  const cargarVehiculos = async () => {
    try {
      const respuesta = await fetch(`${ip}/services/public/citas.php?action=readAllByClient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cliente: Constantes.ID_CLIENTE }),
      });

      const textoRespuesta = await respuesta.text();
      console.log('Respuesta cruda:', textoRespuesta);

      const datos = JSON.parse(textoRespuesta);

      if (datos.status === 1) {
        setVehiculos(datos.dataset);
      } else {
        setVehiculos([]); // Reset vehicles if there was an error
        console.error('Error al cargar los vehículos:', datos.error);
      }
    } catch (error) {
      setVehiculos([]); // Reset vehicles if there was an error
      console.error('Error al cargar los vehículos:', error);
    }
  };

  const cargarServicios = async () => {
    try {
      const respuesta = await fetch(`${ip}/services/public/citas.php?action=getServices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const datos = await respuesta.json();
      if (datos.status === 1) {
        setServicios(datos.dataset);
      } else {
        setServicios([]); // Reset services if there was an error
        console.error('Error al cargar los servicios:', datos.error);
      }
    } catch (error) {
      setServicios([]); // Reset services if there was an error
      console.error('Error al cargar los servicios:', error);
    }
  };

  const mostrarModo = (modoActual) => {
    setMostrar(true);
    setModo(modoActual);
  };

  const mostrarSelectorDeFecha = () => {
    mostrarModo('date');
  };

  const manejarConfirmacion = (evento, fechaSeleccionada) => {
    setMostrar(Platform.OS === 'ios'); // Oculta el selector en Android después de seleccionar una fecha
    if (evento.type === 'set' && fechaSeleccionada) {
      setFecha(fechaSeleccionada);
    }
  };

  const manejarAgendar = async () => {
    if (!vehiculo) {
      alert('Por favor, seleccione un vehículo.');
      return;
    }

    if (serviciosSeleccionados.length === 0) {
      alert('Por favor, seleccione al menos un servicio.');
      return;
    }

    if (!fecha) {
      alert('Por favor, seleccione una fecha.');
      return;
    }

    const cita = {
      id_vehiculo: vehiculo,
      id_servicio: serviciosSeleccionados,
      fecha_cita: fecha.toISOString().split('T')[0],
    };

    console.log('Datos enviados:', cita);

    try {
      const respuesta = await fetch(`${ip}/services/public/citas.php?action=createRow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cita),
      });
  
      if (!respuesta.ok) {
        throw new Error(`HTTP error! Status: ${respuesta.status}`);
      }
  
      const textoRespuesta = await respuesta.text();
      console.log('Respuesta del servidor en texto:', textoRespuesta);
  
      try {
        const datos = JSON.parse(textoRespuesta);
        console.log('Datos procesados:', datos);
  
        if (datos.status === 1) {
          alert('Cita agendada con éxito');
          // Limpiar los campos después de un registro exitoso
          setFecha(new Date());
          setVehiculo('');
          setServiciosSeleccionados([]);
        } else {
          console.error('Error en la respuesta:', datos.error);
          alert('Error al agendar la cita: ' + datos.error);
        }
      } catch (error) {
        console.error('Error al parsear la respuesta JSON:', error);
        alert('Error al procesar la respuesta del servidor.');
      }
    } catch (error) {
      console.error('Error al agendar la cita:', error);
      alert('Error al agendar la cita. Por favor, inténtelo nuevamente.');
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.titulo}>Agendar cita</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={[]}
        renderItem={() => null} // No renderiza elementos de lista, solo el encabezado
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <View style={styles.contenedorPicker}>
              <Picker
                selectedValue={vehiculo}
                style={styles.picker}
                onValueChange={(valorSeleccionado) => setVehiculo(valorSeleccionado)}
              >
                <Picker.Item label="Seleccione un vehículo" value="" />
                {vehiculos.length === 0 ? (
                  <Picker.Item label="No se encontraron vehículos" value="" />
                ) : (
                  vehiculos.map((vehiculo) => (
                    <Picker.Item key={vehiculo.id_vehiculo} label={vehiculo.descripcion_vehiculo} value={vehiculo.id_vehiculo} />
                  ))
                )}
              </Picker>
            </View>
            <View style={styles.contenedorMultiSelect}>
              <MultiSelect
                items={servicios}
                uniqueKey="id_servicio"
                onSelectedItemsChange={(itemsSeleccionados) => setServiciosSeleccionados(itemsSeleccionados)}
                selectedItems={serviciosSeleccionados}
                selectText="Seleccione servicios"
                searchInputPlaceholderText="Buscar servicios..."
                tagRemoveIconColor="#000"
                tagBorderColor="#000"
                tagTextColor="#000"
                selectedItemTextColor="#000"
                selectedItemIconColor="#000"
                itemTextColor="#000"
                displayKey="nombre_servicio"
                searchInputStyle={{ color: '#000' }}
                submitButtonColor="#000"
                submitButtonText="Seleccionar"
                styleDropdownMenu={styles.multiSelectDropdown}
                styleDropdownMenuSubsection={styles.multiSelectDropdownSubsection}
                styleTextDropdown={styles.multiSelectTextDropdown}
                styleListContainer={styles.multiSelectListContainer}
              />
              {servicios.length === 0 && (
                <Text style={styles.noRecordsText}>No se encontraron servicios</Text>
              )}
            </View>
            <View style={styles.contenedorFecha}>
              <Text style={styles.etiqueta}>Fecha de cita</Text>
              <TouchableOpacity onPress={mostrarSelectorDeFecha}>
                <Text style={styles.textoFecha}>{fecha.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {mostrar && (
                <DateTimePicker
                  value={fecha}
                  mode={modo}
                  is24Hour={true}
                  onChange={manejarConfirmacion}
                  style={styles.selectorDeFecha}
                  minimumDate={new Date()}
                />
              )}
            </View>
            <TouchableOpacity style={styles.boton} onPress={manejarAgendar}>
              <Text style={styles.textoBoton}>AGENDAR</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerContainer: {
    padding: 16,
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  contenedorPicker: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
  },
  contenedorMultiSelect: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  contenedorFecha: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoFecha: {
    fontSize: 16,
    color: '#000',
  },
  selectorDeFecha: {
    width: '100%',
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  boton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  multiSelectDropdown: {
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  multiSelectDropdownSubsection: {
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  multiSelectTextDropdown: {
    color: '#000', // Texto en negro
  },
  multiSelectListContainer: {
    backgroundColor: '#fff', // Asegura que el fondo sea blanco
  },
  noRecordsText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 10,
  },
});
