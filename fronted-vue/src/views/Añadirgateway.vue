<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="gateway-container">
        <h1 class="title">Gateways</h1>
        <button @click="openNewGatewayModal" class="add-button">+ Agregar Gateway</button>

        <transition name="fade">
          <table class="gateway-table" v-if="gateways.length">
            <thead>
              <tr>
                <th>ID del Gateway</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Fecha de Configuración</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gateway in gateways" :key="gateway.gatewayId" class="table-row">
                <td>{{ gateway.gatewayId }}</td>
                <td>{{ gateway.location }}</td>
                <td>
                  <span :class="{'status-active': gateway.initialState === 'activo', 'status-inactive': gateway.initialState === 'inactivo'}">
                    {{ gateway.initialState }}
                  </span>
                </td>
                <td>{{ gateway.configDate }}</td>
                <td>
                  <button @click="openEditModal(gateway)" class="edit-button">
                    <i class="bx bx-edit"></i> Editar
                  </button>
                  <button @click="removeGateway(gateway.gatewayId)" class="delete-button">
                    <i class="bx bx-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </transition>

        <!-- Modal para Nuevo Gateway -->
        <MyModal :isVisible="showForm" @close="closeFormModal">
          <h2 class="modal-title">Nuevo Gateway</h2>
          <form @submit.prevent="registerGateway" class="gateway-form">
            <div class="form-group">
              <label for="gatewayId">ID del Gateway</label>
              <input type="text" v-model="gatewayId" id="gatewayId" required />
            </div>
            <div class="form-group">
              <label for="location">Ubicación</label>
              <input type="text" v-model="location" id="location" required />
            </div>
            <div class="form-group">
              <label for="initialState">Estado</label>
              <select v-model="initialState" id="initialState" required>
                <option value="" disabled>Selecciona un estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div class="form-group">
              <label for="configDate">Fecha de Configuración</label>
              <input type="date" v-model="configDate" id="configDate" required />
            </div>
            <button type="submit" class="register-button">Registrar</button>
          </form>
        </MyModal>

        <!-- Modal para Editar Gateway -->
        <MyModal :isVisible="isEditModalVisible" @close="closeEditModal">
          <h2 class="modal-title">Editar Gateway</h2>
          <form @submit.prevent="updateGateway" class="gateway-form">
            <div class="form-group">
              <label for="editGatewayId">ID del Gateway</label>
              <input type="text" v-model="editGateway.gatewayId" id="editGatewayId" required disabled />
            </div>
            <div class="form-group">
              <label for="editLocation">Ubicación</label>
              <input type="text" v-model="editGateway.location" id="editLocation" required />
            </div>
            <div class="form-group">
              <label for="editInitialState">Estado</label>
              <select v-model="editGateway.initialState" id="editInitialState" required>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div class="form-group">
              <label for="editConfigDate">Fecha de Configuración</label>
              <input type="date" v-model="editGateway.configDate" id="editConfigDate" required />
            </div>
            <button type="submit" class="register-button">Actualizar</button>
          </form>
        </MyModal>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ProtectedNavbar from "../components/ProtectedNavbar.vue";
import MyModal from "../components/Modal.vue"; // Importa el componente modal

export default {
  name: "Gateways",
  components: {
    ProtectedNavbar,
    MyModal,
  },
  setup() {
    const gateways = ref([
      { gatewayId: '1', location: 'Oficina Principal', initialState: 'activo', configDate: '2023-01-10' },
      { gatewayId: '2', location: 'Sucursal Norte', initialState: 'inactivo', configDate: '2023-02-15' },
      { gatewayId: '3', location: 'Sucursal Sur', initialState: 'activo', configDate: '2023-03-20' },
    ]);
    
    const gatewayId = ref('');
    const location = ref('');
    const initialState = ref('activo');
    const configDate = ref('');
    const showForm = ref(false);
    
    // Para editar
    const isEditModalVisible = ref(false);
    const editGateway = ref({});

    const openNewGatewayModal = () => {
      resetForm();
      showForm.value = true; // Abre el modal de nuevo gateway
    };

    const registerGateway = () => {
      const gatewayData = {
        gatewayId: gatewayId.value,
        location: location.value,
        initialState: initialState.value,
        configDate: configDate.value,
      };

      gateways.value.push(gatewayData);
      resetForm();
    };

    const resetForm = () => {
      gatewayId.value = '';
      location.value = '';
      initialState.value = 'activo';
      configDate.value = '';
      showForm.value = false; // Cierra el modal
    };

    const closeFormModal = () => {
      showForm.value = false;
    };

    const removeGateway = (id) => {
      gateways.value = gateways.value.filter(gateway => gateway.gatewayId !== id);
    };

    const openEditModal = (gateway) => {
      editGateway.value = { ...gateway }; // Carga los datos del gateway seleccionado
      isEditModalVisible.value = true; // Abre el modal de edición
    };

    const closeEditModal = () => {
      isEditModalVisible.value = false; // Cierra el modal de edición
    };

    const updateGateway = () => {
      const index = gateways.value.findIndex(gateway => gateway.gatewayId === editGateway.value.gatewayId);
      if (index !== -1) {
        gateways.value[index] = { ...editGateway.value }; // Actualiza los datos del gateway
      }
      closeEditModal(); // Cierra el modal
    };

    return { gateways, gatewayId, location, initialState, configDate, registerGateway, showForm, closeFormModal, removeGateway, openEditModal, isEditModalVisible, closeEditModal, editGateway, updateGateway, openNewGatewayModal };
  },
};
</script>

<style scoped>
.content {
  background-color: #f7f9fc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.gateway-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.add-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-bottom: 20px;
}

.add-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.gateway-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.gateway-table th, .gateway-table td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: center;
}

.table-row {
  transition: background-color 0.3s;
}

.table-row:hover {
  background-color: #f1f1f1;
}

.status-active {
  color: #28a745;
}

.status-inactive {
  color: #dc3545;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.gateway-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #007bff;
}

.register-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
}

.register-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333;
}

.edit-button {
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #e0a800;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>