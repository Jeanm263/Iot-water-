<template>
  <header class="topbar" :class="{ scrolled: isScrolled }">
    <div class="topbar-brand">
      <img src="../assets/agua4.png" alt="IOT WATER logo" class="topbar-logo" />
      <span class="topbar-title">IOT WATER</span>
    </div>
    <div class="topbar-profile" @mouseover="hoverProfile = true" @mouseleave="hoverProfile = false" @click="toggleDropdown">
      <img src="../assets/usuario.png" alt="Perfil" class="usuario-img" :class="{ 'hover': hoverProfile }" />
      <span class="profile-name">Andres Puglla</span>
      <i class="bx bx-chevron-down"></i>
      <div class="dropdown" v-if="isDropdownVisible">
        <ul>
          <li @click="editProfile">Edit Profile</li>
          <li @click="viewInbox">Inbox <span class="badge">2</span></li>
          <li @click="viewCalendar">Calendar</li>
          <li @click="viewSettings">Settings</li>
          <li @click="logout">Log Out</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
      isScrolled: false,
      hoverProfile: false,
      isDropdownVisible: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    editProfile() {
      console.log("Edit Profile clicked");
    },
    viewInbox() {
      console.log("Inbox clicked");
    },
    viewCalendar() {
      console.log("Calendar clicked");
    },
    viewSettings() {
      console.log("Settings clicked");
    },
    logout() {
      console.log("Log Out clicked");
    },
  },
};
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; /* Color de fondo de la barra superior */
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%; /* Asegura que ocupe todo el ancho */
  position: fixed; /* Fija la barra superior */
  top: 0; /* Posiciona la barra en la parte superior */
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
  transition: background-color 0.3s, box-shadow 0.3s; /* Transición suave */
}

.topbar.scrolled {
  background-color: rgba(255, 255, 255, 0.9); /* Color de fondo al desplazarse */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra al desplazarse */
}

.topbar-logo {
  width: 40px; /* Ajusta el tamaño del logo */
  height: auto;
  transition: transform 0.3s; /* Transición para el logo */
}

.topbar-logo:hover {
  transform: scale(1.1); /* Aumentar tamaño al pasar el mouse */
}

.topbar-title {
  font-size: 24px;
  margin-left: 10px;
}

.topbar-profile {
  display: flex;
  align-items: center;
  font-size: 14px; /* Tamaño de fuente */
  padding: 5px; /* Espaciado */
  position: relative; /* Para posicionar el dropdown */
  cursor: pointer; /* Cambia el cursor al pasar sobre el perfil */
}

.topbar-profile:hover {
  color: #007bff; /* Cambia el color del texto al pasar el mouse */
}

.profile-name {
  margin-left: 5px; /* Espacio entre la imagen y el nombre */
}

.usuario-img {
  width: 20px; /* Tamaño reducido de la imagen */
  height: 20px; /* Mantiene proporción */
  border-radius: 50%; /* Imagen circular */
  transition: transform 0.3s; /* Transición para la imagen */
}

.usuario-img.hover {
  transform: scale(1.2); /* Aumentar tamaño al pasar el mouse sobre la imagen */
}

.dropdown {
  position: absolute; /* Posiciona el menú desplegable */
  top: 100%; /* Debajo del perfil */
  right: 0; /* Alinea a la derecha */
  background-color: white; /* Fondo blanco */
  border: 1px solid #dee2e6; /* Borde suave */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
  border-radius: 4px; /* Bordes redondeados */
  z-index: 100; /* Asegura que esté por encima de otros elementos */
}

.dropdown ul {
  list-style: none; /* Quita los puntos de la lista */
  padding: 10px 0; /* Espaciado vertical */
  margin: 0; /* Quita márgenes */
}

.dropdown li {
  padding: 10px 20px; /* Espaciado interno */
  cursor: pointer; /* Cambia el cursor al pasar sobre el elemento */
}

.dropdown li:hover {
  background-color: #f1f1f1; /* Color de fondo al pasar el mouse */
}

.badge {
  background-color: #ff4d4d; /* Color para la notificación */
  color: white; /* Texto blanco */
  border-radius: 12px; /* Bordes redondeados */
  padding: 2px 6px; /* Espaciado interno */
  font-size: 12px; /* Tamaño de fuente pequeño */
  margin-left: 5px; /* Espacio entre texto y badge */
}
</style>