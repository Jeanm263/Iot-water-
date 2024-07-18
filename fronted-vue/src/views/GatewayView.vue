<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="header">
        <p>Gateway de Consumo de Agua</p>
      </div>

      <!-- Tabla de dispositivos y consumo -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dispositivo</th>
              <th>Consumo (Litros)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="device in devices" :key="device.id">
              <td>{{ device.id }}</td>
              <td>{{ device.name }}</td>
              <td>{{ device.consumption }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Contenedor para los gráficos -->
      <div class="chart-container">
        <!-- Gráfico de barras horizontales -->
        <div class="chart-item">
          <canvas id="horizontalBarChart"></canvas>
        </div>

        <!-- Gráfico de líneas -->
        <div class="chart-item larger-chart">
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "GatewayConsumoAgua",
  components: {
    ProtectedNavbar,
  },
  setup() {
    const devices = ref([
      { id: 1, name: "Sensor A", consumption: 500 },
      { id: 2, name: "Sensor B", consumption: 300 },
      { id: 3, name: "Sensor C", consumption: 700 },
    ]);

    const lineChartData = ref({
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
      datasets: [
        {
          label: "Consumo (Litros)",
          data: [100, 200, 150, 250, 180],
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
      ],
    });

    onMounted(() => {
      const horizontalBarCtx = document.getElementById("horizontalBarChart").getContext("2d");
      new Chart(horizontalBarCtx, {
        type: "bar",
        data: {
          labels: devices.value.map((device) => device.name),
          datasets: [
            {
              label: "Consumo (Litros)",
              data: devices.value.map((device) => device.consumption),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });

      const lineCtx = document.getElementById("lineChart").getContext("2d");
      new Chart(lineCtx, {
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
    });

    return { devices, lineChartData };
  },
};
</script>

<style scoped>
.content {
  padding: 20px;
}

.header p {
  font-size: 24px;
  font-weight: bold;
}

.table-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 10px;
  width: 500px; /* Ajusta el tamaño de la tabla */
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

.chart-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around; /* Alineación de los gráficos */
}

.chart-item {
  width: 30%; /* Ajusta el tamaño de cada gráfico */
}

.larger-chart {
  width: 50%; /* Ajusta el tamaño del gráfico de líneas para que sea más grande */
}

canvas {
  width: 100% !important; /* Asegura que el canvas llene su contenedor */
  height: auto !important; /* Asegura que el canvas mantenga la proporción */
}
</style>
