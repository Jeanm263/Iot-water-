<template>
  <div class="layout">
    <Topbar @toggle-sidebar="toggleSidebar" />
    <button @click="toggleSidebar" class="hamburger">
      <i class="bx" :class="isSidebarVisible ? 'bx-x' : 'bx-menu'"></i>
    </button>
    <nav :class="['protected-navbar sidebar', { 'sidebar-hidden': !isSidebarVisible }]">
      <div class="navbar-menu">
        <div class="menu-items">
          <router-link v-for="route in routes" :key="route.path" :to="route.path" class="menu-item">
            <i :class="route.icon"></i> {{ route.label }}
          </router-link>

          <div v-for="(route, key) in dropdownRoutes" :key="key" class="dropdown">
            <span @click="toggleDropdown(key)" class="dropdown-toggle">
              <i :class="route.icon"></i> {{ route.label }}
            </span>
            <div :class="['dropdown-content', { open: isDropdownOpen[key] }]">
              <router-link v-for="item in route.items" :key="item.path" :to="item.path" class="dropdown-item">
                {{ item.label }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="logout-btn">
          <button @click="logout" class="logout-button">
            <i class="bx bx-log-out"></i> Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Topbar from './Topbar.vue';

export default {
  components: {
    Topbar,
  },
  data() {
    return {
      isSidebarVisible: true,
      isDropdownOpen: {
        gateways: false,
        medidores: false,
        clientes: false,
        usuarios: false,
      },
      routes: [
        { path: '/dashboard', label: 'Dashboard', icon: 'bx bx-home' },
      ],
      dropdownRoutes: {
        gateways: {
          label: 'Gateways',
          icon: 'bx bx-news',
          items: [
            { path: '/add-gateway', label: 'Añadir nuevo gateway' },
            { path: '/edit-gateway', label: 'Editar gateway existente' },
            { path: '/delete-gateway', label: 'Eliminar un gateway' },
          ],
        },
        medidores: {
          label: 'Medidores',
          icon: 'bx bx-tachometer',
          items: [
            { path: '/add-medidor', label: 'Añadir nuevo medidor' },
            { path: '/edit-medidor', label: 'Editar medidor existente' },
            { path: '/info-medidor', label: 'Detalle de Medidor' },
          ],
        },
        clientes: {
          label: 'Clientes',
          icon: 'bx bx-user',
          items: [
            { path: '/add-cliente', label: 'Añadir nuevo cliente' },
            { path: '/edit-cliente', label: 'Editar cliente existente' },
            { path: '/delete-cliente', label: 'Eliminar un cliente' },
          ],
        },
        usuarios: {
          label: 'Usuarios',
          icon: 'bx bx-group',
          items: [
            { path: '/add-usuario', label: 'Añadir nuevo usuario' },
            { path: '/edit-usuario', label: 'Editar usuario existente' },
            { path: '/delete-usuario', label: 'Eliminar un usuario' },
          ],
        },
      }
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    toggleDropdown(dropdown) {
      this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
    },
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

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}

.hamburger {
  position: absolute;
  top: 70px; /* Ajustado para estar más abajo */
  left: 15px;
  background: #1e3a8a; /* Color de fondo del botón */
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  border-radius: 5px; /* Bordes redondeados */
}

.sidebar {
  font-family: "Times New Roman", Times, serif;
  width: 220px;
  background-color: #003B73; /* Color de fondo */
  color: white;
  height: calc(100vh - 50px);
  position: fixed;
  top: 50px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.sidebar-hidden {
  transform: translateX(-100%);
}

.navbar-menu {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-item,
.dropdown-toggle {
  text-decoration: none;
  padding: 15px 20px;
  display: block;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.menu-item:hover,
.dropdown-toggle:hover {
  background-color: #1a5276;
  transform: scale(1.05);
}

.dropdown-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.dropdown-content.open {
  max-height: 500px;
  padding: 10px 0;
}

.dropdown-item {
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #1a5276;
}

.logout-btn {
  padding: 20px;
}

.logout-button {
  background-color: #c0392b;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #a93226;
}

/* Media Queries para Responsividad */
@media (max-width: 768px) {
  .sidebar {
    width: 200px; /* Anchura del sidebar en móviles */
  }

  .sidebar-hidden {
    transform: translateX(-100%);
  }

  .navbar-menu {
    flex-direction: column;
  }

  .navbar-menu a,
  .navbar-menu button {
    padding: 10px;
    width: 100%;
  }

  .dropdown-content {
    position: static;
    width: 100%;
  }
}
</style>