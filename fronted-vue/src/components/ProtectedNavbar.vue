<template>
  <div class="layout">
    <nav class="protected-navbar sidebar">
      <div class="navbar-brand profile">
        <router-link to="/dashboard">
          <img src="../assets/logo.png" alt="IOT WATER logo" class="navbar-logo" />
        </router-link>
      </div>
      <hr>
      <div class="user-profile">
        <img src="../assets/usuario.png" alt="User Profile" class="profile-picture" />
        <div class="user-info">
          <p>Pepito Perez</p>
          <p>Frontend developer</p>
        </div>
      </div>
      <hr />
      <div class="navbar-menu">
        <router-link to="/dashboard"> <i class="bx bx-home"></i> Dashboard </router-link>
        <router-link to="/medidor"> <i class="bx bx-home"></i> Medidor </router-link>
        <router-link to="/consumo"> <i class="bx bx-stats"></i> Consumo </router-link>
        <router-link to="/gateway"> <i class="bx bx-news"></i> Gateway </router-link>
        <router-link to="/Mapa"> <i class="bx bx-news"></i> Mapa </router-link>

        <button @click="logout"><i class="bx bx-log-out"></i> Cerrar Sesión</button>
      </div>
    </nav>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  methods: {
    logout() {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          this.$router.push("/login");
          Swal.fire("Cerraste sesión", "Hasta luego Admin!", "success");
        }
      });
    },
  },
};
</script>

<style>
.sidebar {
  font-family: "Times New Roman", Times, serif;
  width: 250px;
  background-color: #20252a;
  color: white;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
}

.profile {
  margin: 10px;
  text-align: center;
  background-color: #cfcfcf23;
  border-radius: 10px;
}

.navbar-logo {
  width: 100px;
  height: 50px;
}

.user-profile {
  text-align: center;
  position: relative;
  background-image: url("../assets/imagen1.png");
  background-size: cover;
  background-position: center;
  padding: 5px 0;
  border-radius: 10px;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid white;
}

.user-info {
  color: white;
  margin-top: 10px;
}

.navbar-title {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
}

.navbar-menu {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  color: white;
}

.navbar-menu a {
  text-decoration: none;
  padding: 15px 20px;
  display: block;
  color: white;
}

.navbar-menu a:hover,
.navbar-menu button:hover {
  background-color: #34495e;
}

.navbar-menu button {
  background: none;
  border: none;
  color: white;
  text-align: left;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
}

.navbar-menu button:focus {
  outline: none;
}

.content {
  margin-left: 250px;
  padding: 20px;
  width: calc(100% - 250px);
}
</style>
