<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="gateway-container">
        <h1 class="title">Medidores</h1>
        <button @click="openNewMeterModal" class="add-button">+ Agregar Medidor</button>

        <transition name="fade">
          <table class="gateway-table" v-if="meters.length">
            <thead>
              <tr>
                <th>ID del Medidor</th>
                <th>Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="meter in meters" :key="meter.meterId" class="table-row">
                <td>{{ meter.meterId }}</td>
                <td>{{ meter.location }}</td>
                <td>
                  <button @click="removeMeter(meter.meterId)" class="delete-button">
                    <i class="bx bx-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </transition>

        <!-- Modal para Nuevo Medidor -->
        <MyModal :isVisible="showMeterForm" @close="closeMeterFormModal">
          <h2 class="modal-title">Nuevo Medidor</h2>
          <form @submit.prevent="registerMeter" class="gateway-form">
            <div class="form-group">
              <label for="meterId">ID del Medidor</label>
              <input type="text" v-model="meterId" id="meterId" required />
            </div>
            <div class="form-group">
              <label for="meterLocation">Ubicación del Medidor</label>
              <input type="text" v-model="meterLocation" id="meterLocation" required />
            </div>
            <button type="submit" class="register-button">Registrar</button>
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
  name: "Meters",
  components: {
    ProtectedNavbar,
    MyModal,
  },
  setup() {
    const meters = ref([]);
    const showMeterForm = ref(false);
    const meterId = ref('');
    const meterLocation = ref('');

    const openNewMeterModal = () => {
      resetMeterForm();
      showMeterForm.value = true; // Abre el modal de nuevo medidor
    };

    const registerMeter = () => {
      const meterData = {
        meterId: meterId.value,
        location: meterLocation.value,
      };

      meters.value.push(meterData);
      resetMeterForm();
    };

    const resetMeterForm = () => {
      meterId.value = '';
      meterLocation.value = '';
      showMeterForm.value = false; // Cierra el modal de medidor
    };

    const closeMeterFormModal = () => {
      showMeterForm.value = false;
    };

    const removeMeter = (id) => {
      meters.value = meters.value.filter(meter => meter.meterId !== id);
    };

    return { 
      meters, 
      showMeterForm,
      meterId,
      meterLocation,
      openNewMeterModal,
      registerMeter,
      closeMeterFormModal,
      removeMeter,
    };
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

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus {
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

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>