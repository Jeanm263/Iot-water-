<template>
  <ProtectedNavbar />

  <div class="content">
    <!-- Contenedor para los gráficos -->
    <div class="chart-container">
      <!-- Gráfico de barras -->
      <div class="chart-item">
        <canvas id="barChart"></canvas>
      </div>

      <!-- Gráfico de líneas -->
      <div class="chart-item larger-chart">
        <canvas id="lineChart"></canvas>
      </div>
    </div>
<hr>
    <!-- Tabla de porcentajes -->
    <p style="text-align: center;">Consumo</p>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in percentageData" :key="data.id">
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.percentage }}%</td>
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
    const percentageData = ref([
      { id: 1, name: "Categoria A", percentage: 25 },
      { id: 2, name: "Categoria B", percentage: 35 },
      { id: 3, name: "Categoria C", percentage: 40 },
    ]);

    const lineChartData = ref({
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
    });

    onMounted(() => {
      const barCtx = document.getElementById("barChart").getContext("2d");
      new Chart(barCtx, {
        type: "bar",
        data: {
          labels: percentageData.value.map((data) => data.name),
          datasets: [
            {
              label: "Porcentaje",
              data: percentageData.value.map((data) => data.percentage),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
          scales: {
            x: {
              barPercentage: 0.5,
              categoryPercentage: 0.5,
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

    return { percentageData, lineChartData };
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

.header p {
  font-size: 24px;
  font-weight: bold;
}

.chart-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around; /* Alineación de los gráficos */
}

.chart-item {
  width: 50%; /* Ajusta el tamaño de cada gráfico */
}

.larger-chart {
  width: 50%; /* Ajusta el tamaño del gráfico de líneas para que sea más grande */
}

canvas {
  width: 100% !important; /* Asegura que el canvas llene su contenedor */
  height: auto !important; /* Asegura que el canvas mantenga la proporción */
}

.table-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 10px;
  width: 80%; /* Ajusta el tamaño de la tabla */
  max-width: 800px; /* Ajusta el tamaño máximo de la tabla */
  margin-left: auto;
  margin-right: auto; /* Centra horizontalmente */
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
  border-right: 1px solid #ddd; 
}

td {
  border-right: 1px solid #ddd; 
}

th:last-child,
td:last-child {
  border-right: none;
}

</style>
