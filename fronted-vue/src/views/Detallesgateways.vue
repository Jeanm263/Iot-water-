<template>
  <ProtectedNavbar />

  <div class="content">
    <div class="header">
      <h1>Gateway</h1>
    </div>

    <div class="main-card">
      <div class="medidor-info">
        <div class="icon-container">
          <img src="../assets/descarga.png" alt="Icono medidor" />
        </div>
        <div class="details">
          <p><strong>Modelo:</strong> 3424hjkk</p>
          <p><strong>Código:</strong> 3424hjkk</p>
          <p><strong>Fecha de instalación:</strong> 3424hjkk</p>
          <p><strong>Ubicación:</strong> 3424hjkk</p>
          <p><strong>ID del medidor:</strong> 3424hjkk</p>
        </div>
      </div>
    </div>

    <div class="tables-container">
      <div class="table-wrapper">
        <h3>Información del Gateway</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Código</th>
                <th>Ubicación</th>
                <th>ID del Gateway</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12 Jan 2022</td>
                <td>100000000</td>
                <td>$$</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-wrapper">
        <h3>Información del Cliente</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>ID del Cliente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ray</td>
                <td>ray@example.com</td>
                <td>$$</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "DetalleMedidor",
  components: {
    ProtectedNavbar,
  },
};
</script>

<style scoped>
.content {
  padding: 30px;
  margin-left: 220px;
  max-width: 900px;
  margin: 60px auto 0;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2rem;
  color: #333;
}

.header p {
  font-size: 1.2rem;
  color: #777;
}

.main-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.2s;
}

.main-card:hover {
  transform: scale(1.03);
}

.medidor-info {
  display: flex;
  gap: 30px;
  align-items: center;
}

.icon-container img {
  width: 120px;
  height: auto;
  object-fit: contain;
}

.details p {
  margin: 10px 0;
  font-size: 1rem;
}

.tables-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  flex-wrap: wrap;
}

.table-wrapper {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 20px;
  transition: background-color 0.2s;
  min-width: 300px;
}

.table-wrapper:hover {
  background-color: #f0f8ff;
}

h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
}

.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
  transition: background-color 0.2s;
}

table th {
  background: #f5f5f5;
  font-weight: bold;
}

tbody tr:hover {
  background-color: #e6f7ff;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
    padding: 20px;
  }

  .header h1 {
    font-size: 1.5rem;
  }

  .header p {
    font-size: 1rem;
  }

  .main-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .medidor-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .tables-container {
    flex-direction: column;
    gap: 20px;
  }

  .table-wrapper {
    width: 100%;
  }
}
</style>