<template>
  <ProtectedNavbar />

  <div class="content">
    <!-- Encabezado -->
    <div class="header">
      <h1>Bienvenido <span class="username">Username</span></h1>
      <p>Accesos directos y estadísticas</p>
    </div>

    <!-- Filtros -->
    <div class="filter-container">
      <select v-model="selectedFilter" @change="applyFilter">
        <option value="all">Todos</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </select>
    </div>

    <!-- Tarjetas de estadísticas -->
    <div class="stats-container">
      <div class="stat-card" @mouseover="showDetails('medidores')" @mouseleave="hideDetails" @click="navigateToDetails('medidores')">
        <p>MEDIDORES ACTIVOS</p>
        <h2>{{ stats.medidores }}</h2>
        <span class="icon">💧</span>
        <a href="#">Ver más detalles ➔</a>
        <div v-if="detailsVisible === 'medidores'" class="tooltip">Detalles sobre medidores activos</div>
      </div>
      <div class="stat-card" @mouseover="showDetails('gateways')" @mouseleave="hideDetails" @click="navigateToDetails('gateways')">
        <p>GATEWAYS ACTIVOS</p>
        <h2>{{ stats.gateways }}</h2>
        <span class="icon">🌐</span>
        <a href="#">Ver más detalles ➔</a>
        <div v-if="detailsVisible === 'gateways'" class="tooltip">Detalles sobre gateways activos</div>
      </div>
      <div class="stat-card" @mouseover="showDetails('consumo')" @mouseleave="hideDetails" @click="navigateToDetails('consumo')">
        <p>CONSUMO HOY</p>
        <h2>{{ stats.consumo }}</h2>
        <span class="icon">📊</span>
        <a href="#">Ver más detalles ➔</a>
        <div v-if="detailsVisible === 'consumo'" class="tooltip">Detalles sobre consumo hoy</div>
      </div>
      <div class="stat-card" @mouseover="showDetails('clientes')" @mouseleave="hideDetails" @click="navigateToDetails('clientes')">
        <p>CLIENTES</p>
        <h2>{{ stats.clientes }}</h2>
        <span class="icon">👤</span>
        <a href="#">Ver más detalles ➔</a>
        <div v-if="detailsVisible === 'clientes'" class="tooltip">Detalles sobre clientes</div>
      </div>
    </div>

    <hr />

    <!-- Gráficos y ubicación -->
    <div class="charts-container">
      <div class="chart-item fade-in">
        <h3>Estadística de consumo de agua por mes</h3>
        <canvas id="lineChart" @click="showChartDetails"></canvas>
      </div>
      <div class="chart-item fade-in">
        <h3>Ubicación</h3>
        <input type="text" placeholder="Ingrese el ID del medidor" @keypress.enter="searchLocation" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.257897529596!2d-99.16397782541112!3d19.43260763918001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92de6489c4b%3A0x9bd83c23c150f5e!2sPalacio%20de%20Bellas%20Artes!5e0!3m2!1sen!2smx!4v1678303774894!5m2!1sen!2smx"
          width="100%"
          height="300"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    <div v-if="notification" class="notification">{{ notification }}</div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "Dashboard",
  components: {
    ProtectedNavbar,
  },
  setup() {
    const detailsVisible = ref(null);
    const selectedFilter = ref("all");
    const notification = ref("");
    const stats = ref({
      medidores: 784200,
      gateways: 784200,
      consumo: 784200,
      clientes: 784200,
    });

    const showDetails = (type) => {
      detailsVisible.value = type;
    };

    const hideDetails = () => {
      detailsVisible.value = null;
    };

    const navigateToDetails = (type) => {
      notification.value = `Navegando a detalles de ${type}`;
      setTimeout(() => {
        notification.value = ""; // Eliminar notificación después de 2 segundos
      }, 2000);
    };

    const applyFilter = () => {
      notification.value = `Filtro aplicado: ${selectedFilter.value}`;
      setTimeout(() => {
        notification.value = ""; // Eliminar notificación después de 2 segundos
      }, 2000);
    };

    const showChartDetails = () => {
      notification.value = "Mostrando detalles del gráfico";
      setTimeout(() => {
        notification.value = ""; // Eliminar notificación después de 2 segundos
      }, 2000);
    };

    const searchLocation = () => {
      alert("Buscando ubicación...");
    };

    onMounted(() => {
      const lineCtx = document.getElementById("lineChart").getContext("2d");
      new Chart(lineCtx, {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [
            {
              label: "Consumo",
              data: [10, 20, 30, 40, 50],
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    });

    return {
      detailsVisible,
      showDetails,
      hideDetails,
      navigateToDetails,
      applyFilter,
      selectedFilter,
      searchLocation,
      showChartDetails,
      notification,
      stats,
    };
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #eaf6fc;
}

.content {
  padding: 20px;
  margin-left: 200px; /* Ajustamos el margen para que el contenido no se tape con la barra lateral */
  max-width: 1100px; /* Reducción del ancho máximo */
  margin: 60px auto 0; /* Ajustado para mover el contenido hacia abajo */
}

.header h1 {
  font-size: 1.8rem; /* Reducido para ser más pequeño */
  color: #333;
}

.header .username {
  color: #007bff;
}

.filter-container {
  margin-bottom: 15px;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  gap: 15px; /* Reducido para ser más compacto */
  margin: 15px 0; /* Reducido para ser más compacto */
}

.stat-card {
  background: white;
  padding: 10px; /* Reducido para ser más compacto */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #d1ecf1; /* Color de fondo al pasar el mouse */
}

.stat-card p {
  font-size: 0.85rem; /* Reducido para ser más compacto */
  color: #555;
}

.stat-card h2 {
  font-size: 1.3rem; /* Reducido para ser más compacto */
  margin: 10px 0;
}

.stat-card .icon {
  font-size: 1.3rem; /* Reducido para ser más compacto */
  color: #007bff;
}

.stat-card a {
  color: #007bff;
  text-decoration: none;
  font-size: 0.75rem; /* Reducido para ser más compacto */
}

.tooltip {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 10;
  margin-top: -30px;
}

.charts-container {
  display: flex;
  justify-content: space-between;
  gap: 15px; /* Reducido para ser más compacto */
}

.chart-item {
  flex: 1;
  background: white;
  padding: 10px; /* Reducido para ser más compacto */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chart-item h3 {
  margin-bottom: 10px; /* Reducido para ser más compacto */
  font-size: 0.9rem; /* Reducido para ser más compacto */
}

.chart-item.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

iframe {
  border-radius: 8px;
}

.notification {
  background: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  position: fixed;
  top: 20px;
  right: 20px;
  transition: opacity 0.5s;
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  .content {
    margin-left: 0; /* Elimina el margen izquierdo en móviles */
    padding: 10px; /* Reduce el padding en móviles */
  }

  .stats-container {
    flex-direction: column; /* Cambia a columna en móviles */
  }

  .charts-container {
    flex-direction: column; /* Cambia a columna en móviles */
  }

  .stat-card {
    margin-bottom: 10px; /* Espacio entre tarjetas en móviles */
  }

  .chart-item {
    margin-bottom: 10px; /* Espacio entre gráficos en móviles */
  }
}
</style>