<template>
    <div>
      <ProtectedNavbar />
  
      <div class="content">
        <div class="user-container">
          <h1 class="title">Usuarios</h1>
          <button @click="openNewUserModal" class="add-button">Registrar Usuario</button>
  
          <!-- Tabla de usuarios -->
          <table class="user-table">
            <thead>
              <tr>
                <th>ID de Usuario</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Fecha de Instalación</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.userId">
                <td>{{ user.userId }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.password }}</td>
                <td>{{ user.installDate }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Modal para Nuevo Usuario -->
          <MyModal :isVisible="showForm" @close="closeFormModal">
            <h2 class="modal-title">Nuevo Usuario</h2>
            <form @submit.prevent="registerUser" class="user-form">
              <div class="form-group">
                <label for="userId">ID de Usuario</label>
                <input type="text" v-model="userId" id="userId" required />
              </div>
              <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" v-model="name" id="name" required />
              </div>
              <div class="form-group">
                <label for="email">Correo</label>
                <input type="email" v-model="email" id="email" required />
              </div>
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" v-model="password" id="password" required />
              </div>
              <div class="form-group">
                <label for="installDate">Fecha de Instalación</label>
                <input type="date" v-model="installDate" id="installDate" required />
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
    name: "Usuarios",
    components: {
      ProtectedNavbar,
      MyModal,
    },
    setup() {
      // Inicializa el arreglo de usuarios como vacío
      const users = ref([]);
  
      const userId = ref("");
      const name = ref("");
      const email = ref("");
      const password = ref("");
      const installDate = ref("");
      const showForm = ref(false);
  
      const openNewUserModal = () => {
        resetForm();
        showForm.value = true; // Abre el modal de nuevo usuario
      };
  
      const registerUser = () => {
        // Agrega un nuevo usuario a la tabla
        const newUser = {
          userId: userId.value,
          name: name.value,
          email: email.value,
          password: password.value,
          installDate: installDate.value,
        };
  
        users.value.push(newUser); // Agrega el usuario al array
        resetForm(); // Reinicia el formulario y cierra el modal
      };
  
      const resetForm = () => {
        userId.value = "";
        name.value = "";
        email.value = "";
        password.value = "";
        installDate.value = "";
        showForm.value = false; // Cierra el modal
      };
  
      const closeFormModal = () => {
        showForm.value = false; // Cierra el modal
      };
  
      return { users, userId, name, email, password, installDate, registerUser, showForm, openNewUserModal, closeFormModal };
    },
  };
  </script>
  
  <style scoped>
  .content {
    background-color: #eaf6fc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
  
  .user-container {
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
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    margin-bottom: 20px;
  }
  
  .add-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .user-table th, .user-table td {
    border: 1px solid #dee2e6;
    padding: 10px;
    text-align: left;
  }
  
  .user-table th {
    background-color: #f8f9fa;
    color: #333;
    font-weight: bold;
  }
  
  .user-table tr:hover {
    background-color: #f1f1f1;
  }
  
  .user-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
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
  </style>