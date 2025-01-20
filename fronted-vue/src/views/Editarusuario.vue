<template>
    <div>
      <ProtectedNavbar />
  
      <div class="content">
        <div class="user-container">
          <h1 class="title">Usuarios</h1>
  
          <!-- Tabla de usuarios -->
          <table class="user-table">
            <thead>
              <tr>
                <th>ID de Usuario</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Fecha de Instalación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.userId">
                <td>{{ user.userId }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.password }}</td>
                <td>{{ user.installDate }}</td>
                <td>
                  <button @click="editUser(user)" class="edit-button">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Modal para Editar Usuario -->
          <MyModal :isVisible="showForm" @close="closeFormModal">
            <h2 class="modal-title">Editar Usuario</h2>
            <form @submit.prevent="updateUser()" class="user-form">
              <div class="form-group">
                <label for="userId">ID de Usuario</label>
                <input type="text" v-model="userId" id="userId" disabled />
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
  import MyModal from "../components/Modal.vue";
  
  export default {
    name: "Usuarios",
    components: {
      ProtectedNavbar,
      MyModal,
    },
    setup() {
      // Datos iniciales quemados
      const users = ref([
        { userId: "1", name: "Juan Pérez", email: "juan@example.com", password: "1234", installDate: "2023-01-01" },
        { userId: "2", name: "Ana López", email: "ana@example.com", password: "abcd", installDate: "2023-02-15" },
      ]);
  
      const userId = ref("");
      const name = ref("");
      const email = ref("");
      const password = ref("");
      const installDate = ref("");
      const showForm = ref(false);
      const currentUserIndex = ref(null);
  
      const editUser = (user) => {
        userId.value = user.userId;
        name.value = user.name;
        email.value = user.email;
        password.value = user.password;
        installDate.value = user.installDate;
        currentUserIndex.value = users.value.findIndex((u) => u.userId === user.userId);
        showForm.value = true;
      };
  
      const updateUser = () => {
        if (currentUserIndex.value !== null) {
          users.value[currentUserIndex.value] = {
            userId: userId.value,
            name: name.value,
            email: email.value,
            password: password.value,
            installDate: installDate.value,
          };
          resetForm(); // Limpia el formulario
        }
      };
  
      const resetForm = () => {
        userId.value = "";
        name.value = "";
        email.value = "";
        password.value = "";
        installDate.value = "";
        showForm.value = false;
        currentUserIndex.value = null;
      };
  
      const closeFormModal = () => {
        showForm.value = false;
      };
  
      return {
        users,
        userId,
        name,
        email,
        password,
        installDate,
        showForm,
        editUser,
        updateUser,
        closeFormModal,
      };
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
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .user-table th, .user-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .user-table th {
    background-color: #007bff;
    color: white;
  }
  
  .edit-button {
    background-color: #ffc107;
    color: black;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .edit-button:hover {
    background-color: #e0a800;
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