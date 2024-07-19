<template>
  <ProtectedNavbar />

  <div class="content">
    <div class="header">
      <div id="capa-padre">
        <h1>Medidor</h1>
        <div id="app">
          <button @click="showModal = true">Crear Medidor</button>
          <MyModal :isVisible="showModal" @close="showModal = false">
            <form @submit.prevent="handleSubmit">
              <h2>Crear Medidor</h2>

              <div class="form-group">
                <label
                  for="fotografia"
                  style="
                    background-color: #067b80;
                    color: white;
                    padding: 6px;
                    border-radius: 13px;
                  "
                >
                  <i class="bx bx-check"></i> Subir Foto</label
                >
                <input
                  type="file"
                  id="fotografia"
                  @change="handleFileUpload"
                  accept="image/*"
                  required
                  hidden
                />
              </div>

              <div v-if="imagePreview" class="image-preview">
                <img :src="imagePreview" alt="Vista previa de la imagen" />
              </div>

              <div class="form-group">
                <label for="nombre">Nombre y Apellido: </label>
                <input
                  type="text"
                  id="nombre"
                  v-model="formData.nombre"
                  required
                  placeholder="Nombre y Apellido"
                />
              </div>

              <div class="form-group">
                <label for="calle1">Calle 1: </label>
                <input
                  type="text"
                  id="calle1"
                  v-model="formData.calle1"
                  required
                  placeholder="Calle 1"
                />
              </div>

              <div class="form-group">
                <label for="calle2">Calle 2: </label>
                <input
                  type="text"
                  id="calle2"
                  v-model="formData.calle2"
                  required
                  placeholder="Calle 2"
                />
              </div>

              <div class="form-group">
                <label for="ciudad">Ciudad: </label>
                <input
                  type="text"
                  id="ciudad"
                  v-model="formData.ciudad"
                  required
                  placeholder="Ciudad"
                />
              </div>

              <div class="button-container">
                <button type="submit">Guardar</button>
              </div>
            </form>
          </MyModal>
        </div>
      </div>
    </div>

    <div class="info-section">
      <p>Información</p>
    </div>

    <!-- Tabla de información -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Foto</th>
            <th>Nombre y Apellido</th>
            <th>Calle 1</th>
            <th>Calle 2</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td><img :src="user.photo" class="user-photo" /></td>
            <td>{{ user.name }}</td>
            <td>{{ user.calle1 }}</td>
            <td>{{ user.calle2 }}</td>
            <td>{{ user.ciudad }}</td>
            <td>
              <button class="action-button view" @click="viewUser(user)">Ver</button>
              <button class="action-button edit" @click="editUser(user)">Editar</button>
              <button class="action-button delete" @click="deleteUser(user.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal Ver Medidor -->
  <div v-if="showViewUserModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeViewUserModal">&times;</span>
      <h2>Detalles del Medidor</h2>
      <p><strong>Nombre y Apellido:</strong> {{ viewUserData.name }}</p>
      <p><strong>Calle 1:</strong> {{ viewUserData.calle1 }}</p>
      <p><strong>Calle 2:</strong> {{ viewUserData.calle2 }}</p>
      <p><strong>Ciudad:</strong> {{ viewUserData.ciudad }}</p>
      <img :src="viewUserData.photo" class="user-photo" />
    </div>
  </div>

  <!-- Modal Editar Medidor -->
  <div v-if="showEditUserModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeEditUserModal">&times;</span>
      <h2>Editar Medidor</h2>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="editName">Nombre y Apellido:</label>
          <input
            type="text"
            id="editName"
            v-model="editUserData.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="editCalle1">Calle 1:</label>
          <input
            type="text"
            id="editCalle1"
            v-model="editUserData.calle1"
            required
          />
        </div>
        <div class="form-group">
          <label for="editCalle2">Calle 2:</label>
          <input
            type="text"
            id="editCalle2"
            v-model="editUserData.calle2"
            required
          />
        </div>
        <div class="form-group">
          <label for="editCiudad">Ciudad:</label>
          <input
            type="text"
            id="editCiudad"
            v-model="editUserData.ciudad"
            required
          />
        </div>
        <div class="button-container">
          <button type="submit">Guardar Cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";
import MyModal from "../components/Modal.vue";
import Swal from "sweetalert2";

export default {
  name: "iot",
  components: {
    ProtectedNavbar,
    MyModal,
  },
  data() {
    return {
      showModal: false,
      showViewUserModal: false,
      showEditUserModal: false,
      formData: {
        fotografia: "",
        nombre: "",
        calle1: "",
        calle2: "",
        ciudad: "",
      },
      viewUserData: {},
      editUserData: {},
      imagePreview: null,
      users: [
        // Datos iniciales de los usuarios...
      ],
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.fotografia = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleSubmit() {
      // Crear un nuevo medidor
      const newUser = {
        id: this.users.length + 1, // Asignar un ID único
        photo: this.imagePreview, // Usar la imagen previa como URL
        name: this.formData.nombre,
        calle1: this.formData.calle1,
        calle2: this.formData.calle2,
        ciudad: this.formData.ciudad,
      };

      // Añadir el nuevo medidor a la lista de usuarios
      this.users.push(newUser);

      // Mostrar un mensaje de éxito
      Swal.fire({
        title: '¡Formulario enviado!',
        text: 'Medidor cargado exitosamente: ' + this.formData.nombre,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.showModal = false;
        this.formData.nombre = "";
        this.formData.calle1 = "";
        this.formData.calle2 = "";
        this.formData.ciudad = "";
        this.imagePreview = null;
      });
    },
    viewUser(user) {
      this.viewUserData = { ...user };
      this.showViewUserModal = true;
    },
    closeViewUserModal() {
      this.showViewUserModal = false;
    },
    editUser(user) {
      this.editUserData = { ...user };
      this.showEditUserModal = true;
    },
    saveChanges() {
      const index = this.users.findIndex(u => u.id === this.editUserData.id);
      if (index !== -1) {
        this.users[index] = { ...this.editUserData };
      }
      this.closeEditUserModal();
    },
    closeEditUserModal() {
      this.showEditUserModal = false;
    },
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id);
    },
  },
};
</script>


<style scoped>
.content {
  padding: 20px;
  text-align: center;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.create-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #00a896;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.info-section {
  margin-top: 20px;
}

.table-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 10px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.user-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.action-button {
  margin: 2px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button.view {
  background-color: #007bff;
  color: white;
}

.action-button.edit {
  background-color: #ffc107;
  color: black;
}

.action-button.delete {
  background-color: #dc3545;
  color: white;
}

/* Modal */

#capa-padre {
  background-color: aliceblue;
  border-radius: 20px;
  text-align: center;
  margin: 5px auto;
  padding: 10px;
  box-shadow: 5px 2px 3px 1px rgba(0, 0, 0, 0.26);
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: black;
}

#app {
  text-align: center;
  margin-top: 10px;
}

.image-preview {
  margin: 10px;
}

.image-preview img {
  max-width: 40%;
  height: auto;
  border-radius: 8px;
  box-shadow: 5px 2px 3px 1px rgba(0, 0, 0, 0.26);
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #0AA5A9;
  color: white;
  border-radius: 13px;
  text-transform: capitalize;
}

button:hover {
  background-color: #067b80;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
}

.form-group label {
  flex: 1;
  margin-right: 10px;
  font-weight: bold;
  text-align: right;
}

.form-group input {
  flex: 2;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button[type="submit"] {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 11px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
