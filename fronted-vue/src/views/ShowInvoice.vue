<template>
  <ProtectedNavbar />

  <div class="invoice-container">
    <h2>Factura del Usuario </h2>
    <div class="invoice-details">
      <div class="invoice-header">
        <h3>EPMaps - Agua de Quito</h3>
        <p>Estado de Cuenta N°:02</p>
      </div>
      <div class="invoice-body">
        <div class="invoice-section">
          <p><strong>Cuenta:</strong> 123456789</p>
          <p><strong>Nombre:</strong> Alberto Lopez</p>
          <p><strong>Dirección:</strong> Calle Ejemplo 123, Quito</p>
          <p><strong>Período de Consumo:</strong> 25-10-2017 / 24-11-2017</p>
          <p><strong>Consumo:</strong> 10m³</p>
        </div>
        <div class="invoice-section">
          <p><strong>Detalle de Valores a Pagar:</strong></p>
          <table>
            <tr>
              <th>Concepto</th>
              <th>Valor</th>
            </tr>
            <tr>
              <td>Agua Potable</td>
              <td>$2.00</td>
            </tr>
            <tr>
              <td>Alcantarillado</td>
              <td>$2.00</td>
            </tr>
            <tr>
              <td>Administración</td>
              <td>$1.20</td>
            </tr>
            <tr>
              <td>IVA 12%</td>
              <td>$0.30</td>
            </tr>
            <tr>
              <th>Total</th>
              <th>$5.50</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="chart-section">
      <h3>Histórico de Consumo Mensual</h3>
      <canvas id="consumptionChart"></canvas>
    </div>
  </div>

</template>

<script>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'ShowInvoice',
  props: ['userId'],
  setup(props) {
    onMounted(() => {
      const ctx = document.getElementById('consumptionChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'],
          datasets: [{
            label: 'Consumo (m³)',
            data: [12, 19, 3, 5, 2, 3, 10],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
};
</script>

<style scoped>
.content {
  padding: 80px;
  min-height: 200vh; /* Asegura que el contenido cubra toda la altura de la ventana */
  background-color: #e0f7fa;
}

.invoice-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.invoice-header {
  margin-bottom: 20px;
}

.invoice-body {
  display: flex;
  justify-content: space-between;
}

.invoice-section {
  flex: 1;
  margin: 10px;
}

.invoice-section table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-section th,
.invoice-section td {
  padding: 8px;
  border: 1px solid #ddd;
}

.chart-section {
  margin-top: 20px;
}
</style>
