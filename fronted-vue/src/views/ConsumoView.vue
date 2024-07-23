<template>
  <ProtectedNavbar />

  <div class="content">
    <div class="header">
      <p>Consumo y Frecuencia</p>
    </div>
    <!-- Contenedor para los gráficos -->
    <div class="chart-container">
      <!-- Gráfico de líneas -->
      <div class="chart-item">
        <canvas id="lineChart"></canvas>
      </div>

      <!-- Gráfico de frecuencia -->
      <div class="chart-item">
        <canvas id="frequencyChart"></canvas>
      </div>
    </div>
    <hr>
    <div class="info-section">
      <p>Información</p>
    </div>
    <!-- Tabla de consumo -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre y Apellido</th>
            <th>Consumo A</th>
            <th>Consumo B</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.consumoA }}</td>
            <td>{{ user.consumoB }}</td>
            <td>{{ user.ciudad }}</td>
            <td>
              <button class="action-button update" @click="updateCharts">Actualizar</button>
              <button type="button" class="action-button invoice" @click="$router.push('/show-invoice/:userId')">Factura</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "iot",
  components: {
    ProtectedNavbar,
  },
  setup() {
    const users = ref([
      { id: 1, name: "Jose Orozco", consumoA: "E1-123", consumoB: "E1-123", ciudad: "quito" },
      { id: 2, name: "Marco Rojas", consumoA: "E1-123", consumoB: "E1-123", ciudad: "Guayaquil" },
      { id: 3, name: "juan Veliz", consumoA: "E1-123", consumoB: "E1-123", ciudad: "Guayas" },
    ]);

    const lineChartData = ref({
      labels: ["junio", "julio", "agosto", "septiembre", "octubre", "noviembre"],
      datasets: [
        {
          label: "Page Views",
          data: [50, 60, 70, 80, 90, 100],
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
        {
          label: "Visitors",
          data: [20, 30, 40, 50, 60, 70],
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    });

    const frequencyChartData = ref({
      labels: ['0.1', '1', '10', '100', '1000', '10000'],
      datasets: [
        {
          label: 'EMP (Q3=2.5m³/h y R250)',
          data: [2, 2, 2, 2, 2, 2],
          borderColor: "#FF0000",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Error típico mecánico',
          data: [2, 1, 0, -1, -2, -2],
          borderColor: "#00FF00",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Error típico estático',
          data: [2, 1, 0, -1, -1, -1],
          borderColor: "#0000FF",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
          borderWidth: 1,
          fill: false,
        }
      ]
    });

    let lineChartInstance = null;
    let frequencyChartInstance = null;

    onMounted(() => {
      const lineCtx = document.getElementById("lineChart").getContext("2d");
      lineChartInstance = new Chart(lineCtx, {
        type: "line",
        data: lineChartData.value,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });

      const frequencyCtx = document.getElementById("frequencyChart").getContext("2d");
      frequencyChartInstance = new Chart(frequencyCtx, {
        type: 'line',
        data: frequencyChartData.value,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            x: {
              type: 'logarithmic',
              position: 'bottom',
              title: {
                display: true,
                text: 'Caudal (litros/hora)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Error de medida'
              }
            }
          }
        }
      });
    });

    const updateCharts = () => {
      // Nuevos datos de ejemplo
      lineChartData.value.datasets[0].data = [60, 70, 80, 90, 100, 110];
      lineChartData.value.datasets[1].data = [30, 40, 50, 60, 70, 80];

      frequencyChartData.value.datasets[0].data = [3, 3, 3, 3, 3, 3];
      frequencyChartData.value.datasets[1].data = [1, 0, -1, -2, -3, -3];
      frequencyChartData.value.datasets[2].data = [1, 0, -1, -2, -2, -2];

      // Actualizar las gráficas
      lineChartInstance.update();
      frequencyChartInstance.update();
    };

    const invoiceUser = (userId) => {
      alert(`Facturando usuario con ID: ${userId}`);
    };

    return { users, lineChartData, frequencyChartData, updateCharts, invoiceUser };
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
body {
  height: 100%;
  margin: 0;
}


.content {
  padding: 20px;
  min-height: 100vh; /* Asegura que el contenido cubra toda la altura de la ventana */
  background-color: #e0f7fa;
}

.header {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.create-button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #00a896;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chart-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.chart-item {
  width: 45%;
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
  border-right: 1px solid #ddd; /* Línea de separación a la derecha de las celdas */
}

th {
  background-color: #f2f2f2;
}

td {
  border-right: 1px solid #ddd; /* Línea de separación a la derecha de las celdas */
}

th:last-child,
td:last-child {
  border-right: none; /* Elimina la línea de separación en la última columna */
}


.action-button {
  margin: 2px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button.update {
  background-color: #ffc107;
  color: black;
}

.action-button.invoice {
  background-color: #28a745;
  color: white;
}
.info-section {
  text-align: center;
}
</style>
