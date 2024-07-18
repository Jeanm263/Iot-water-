<template>
  <ProtectedNavbar />

  <div class="content">
    <div class="header">
      <p>Consumo</p>
    </div>

    <!-- Mapa interactivo -->
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "iot",
  components: {
    ProtectedNavbar,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    initMap() {
      const map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.marker([51.505, -0.09])
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
    },
  },
  mounted() {
    this.initMap();
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

.map-container {
  height: 300px;
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
