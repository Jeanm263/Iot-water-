<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
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

      <hr class="separator" />

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
body {
  height: 100%;
  margin: 0;
}

.content {
  padding: 20px;
  min-height: 100vh; /* Asegura que el contenido cubra al menos la altura de la ventana */
  background-color: #e0f7fa;
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
  width: 100%;
  max-width: 800px; /* Ajusta el tamaño máximo de la tabla */
  margin: 20px auto; /* Centra la tabla horizontalmente */
}

table {
  width: 100%;
  border-collapse: collapse; /* Elimina los espacios entre las celdas */
}

th, td {
  padding: 8px;
  text-align: center; /* Centra el texto dentro de las celdas */
  border-bottom: 1px solid #ddd; /* Línea que separa las filas */
}

th {
  background-color: #f2f2f2;
  border-bottom: 2px solid #bbb; /* Línea que separa el encabezado de la tabla del resto */
}

td {
  border-right: 1px solid #ddd; /* Línea que separa las columnas */
}

td:last-child {
  border-right: none; /* Elimina la línea en la última columna */
}

thead th {
  border-bottom: 2px solid #bbb; /* Línea más gruesa para separar el encabezado */
}


.chart-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around; /* Alineación de los gráficos */
}

.chart-item {
  width: 40%; /* Ajusta el tamaño de cada gráfico */

}

.larger-chart {
  width: 50%; /* Ajusta el tamaño del gráfico de líneas para que sea más grande */
}

canvas {
  width: 100% !important; /* Asegura que el canvas llene su contenedor */
  height: auto !important; /* Asegura que el canvas mantenga la proporción */
}
</style>
