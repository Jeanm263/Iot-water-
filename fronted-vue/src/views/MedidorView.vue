<template>
    <ProtectedNavbar />
  
    <div class="content">
      <div class="header">
        <p>Medidor</p>
        <button class="create-button">Crear Medidor</button>
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
                <button class="action-button view">Ver</button>
                <button class="action-button edit">Editar</button>
                <button class="action-button delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import ProtectedNavbar from "../components/ProtectedNavbar.vue";
  
  export default {
    name: "iot",
    components: {
      ProtectedNavbar,
    },
    data() {
      return {
        users: [
          { id: 1, photo: "path/to/photo1.png", name: "Nuevo y bacan", calle1: "E1-123", calle2: "E1-123", ciudad: "quito" },
          { id: 2, photo: "path/to/photo2.png", name: "Nuevo y bacan", calle1: "E1-123", calle2: "E1-123", ciudad: "Guayaquil" },
          { id: 3, photo: "path/to/photo3.png", name: "Nuevo y bacan", calle1: "E1-123", calle2: "E1-123", ciudad: "Guayas" },
        ],
      };
    },
    methods: {
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
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
  </style>
  