<template>
  <ProtectedNavbar />
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <div class="content">
      <div class="header">
          <p class="titulo">Ubicacion</p>
          <button class="crear-medidor" @click="openCrearMedidorModal">Crear Medidor</button>
      </div>
      <!-- Tabla con 8 columnas -->
      <table class="data-table">
          <thead>
              <tr>
                  <th>Pais</th>
                  <th>Ciudad</th>
                  <th>Barrio</th>
                  <th>Calle Principal</th>
                  <th>Calle Secundaria</th>
                  <th>N° de Casa</th>
                  <th>Nombre Propietario</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Dato 1</td>
                  <td>Dato 2</td>
                  <td>Dato 3</td>
                  <td>Dato 4</td>
                  <td>Dato 5</td>
                  <td>Dato 6</td>
                  <td>Dato 7</td>
                  <td>
                      <button class="accion-btn" @click="Editarmedidor(1)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                      <button class="accion-btn" @click="openMapaModal"><i class="fa fa-eye" aria-hidden="true"></i></button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>

  <!-- Modal Crear Medidor -->
  <div v-if="showCrearMedidorModal" class="modal">
      <div class="modal-content">
          <span class="close" @click="closeCrearMedidorModal">&times;</span>
          <p class="titulo">Crear Medidor</p>
          <p class="texto">Pais:</p>
          <input class="imput" type="text" v-model="pais" placeholder="Nombre del Pais" />
          <p class="texto">Ciudad:</p>
          <input class="imput" type="text" v-model="ciudad" placeholder="Nombre de la Ciudad" />
          <p class="texto">Barrio:</p>
          <input class="imput" type="text" v-model="barrio" placeholder="Nombre del Barrio" />
          <p class="texto">Calle principal:</p>
          <input class="imput" type="text" v-model="calle_principal" placeholder="Nombre de la Calle principal" />
          <p class="texto">Calle secundaria:</p>
          <input class="imput" type="text" v-model="calle_secundaria" placeholder="Nombre de la Calle secundaria" />
          <p class="texto">N° de casa:</p>
          <input class="imput" type="text" v-model="N_casa" placeholder="Ingrese el N° de casa" />
          <p class="texto">Nombre del propietario:</p>
          <input class="imput" type="text" v-model="propietario" placeholder="Nombre y Apellido del dueño" />
          <div class="contenedor-botones">
              <button class="botones-modal" @click="saveChanges">Guardar</button>
              <button class="botones-modal" @click="closeCrearMedidorModal">Cancelar</button>
          </div>
      </div>
  </div>

  <!-- Modal Mapa -->
  <div v-if="showMapaModal" class="modal">
      <div class="modal-content">
          <span class="close" @click="closeMapaModal">&times;</span>
          <p class="titulo">Mapa</p>
          <div id="map" style="height: 400px;"></div>
      </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";
import L from 'leaflet';

export default {
  name: "iot",
  components: {
      ProtectedNavbar,
  },
  data() {
      return {
          showCrearMedidorModal: false,
          showMapaModal: false,
          pais: '',
          ciudad: '',
          barrio: '',
          calle_principal: '',
          calle_secundaria: '',
          N_casa: '',
          propietario: '',
          currentItemId: null,
      };
  },
  methods: {
      logout() {
          localStorage.removeItem("token");
          this.$router.push("/login");
      },
      openCrearMedidorModal() {
          this.resetForm();
          this.showCrearMedidorModal = true;
      },
      closeCrearMedidorModal() {
          this.showCrearMedidorModal = false;
      },
      openMapaModal() {
          this.showMapaModal = true;
          this.$nextTick(() => {
              this.initializeMap();
          });
      },
      closeMapaModal() {
          this.showMapaModal = false;
      },
      Editarmedidor(itemId) {
          // Para editar un medidor existente
          this.currentItemId = itemId;
          this.loadItemData(itemId); // Cargar datos del ítem
          this.openCrearMedidorModal(); // Abrir el modal de creación para edición
      },
      resetForm() {
          this.pais = '';
          this.ciudad = '';
          this.barrio = '';
          this.calle_principal = '';
          this.calle_secundaria = '';
          this.N_casa = '';
          this.propietario = '';
      },
      loadItemData(itemId) {
          // Aquí iría la lógica para cargar los datos del ítem a editar
          // Puedes usar `itemId` para buscar los datos en tu base de datos o en una lista
      },
      saveChanges() {
          if (this.currentItemId) {
              // Lógica para guardar los cambios de edición
          } else {
              // Lógica para crear un nuevo medidor
          }
          this.closeCrearMedidorModal();
      },
      initializeMap() {
          if (this.map) {
              this.map.remove(); // Limpiar el mapa existente si lo hay
          }
          this.map = L.map('map').setView([-0.1807, -78.4678], 12);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(this.map);

          // Permitir que los usuarios agreguen marcadores
          this.map.on('click', (e) => {
              L.marker(e.latlng).addTo(this.map)
                  .bindPopup(`Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`)
                  .openPopup();
          });
      }
  },
};
</script>

<style scoped>
body {
  height: 100%;
  margin: 0;
}

.content {
  padding: 20px;
  min-height: 100vh; /* Asegura que el contenido cubra al menos la altura de la ventana */
  background-color: #e0f7fa;
}

.titulo {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 2em;
  color: #333;
  margin-top: 5px;
}

.crear-medidor {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.crear-medidor:hover {
  background-color: #0056b3;
}

/* Estilos para el modal */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
  width: 30%;
  /* Could be more or less, depending on screen size */
  max-width: 600px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.imput {
  width: 90%;
  margin: 10px auto;
  margin-bottom: 20px;
}

.texto {
  text-align: left;
  margin-bottom: -5px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.data-table th {
  background-color: #f4f4f4;
}

.accion-btn {
  font-size: 12px;
  padding: 4px 8px;
  margin-right: 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

.accion-btn:hover,
.botones-modal:hover {
  background-color: #0056b3;
}

.botones-modal {
  width: 30%;
  margin-right: 4px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  justify-content: space-between;
}

.contenedor-botones {
  display: flex;
  margin-left: 26%;
}
</style>
