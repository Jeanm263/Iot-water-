import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistroView from '@/views/RegistreView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ConsumoView from '@/views/ConsumoView.vue'
import GatewayView from '@/views/Añadirgateway.vue'
import MapaView from '@/views/MapaView.vue'
import MedidorView from '@/views/RegisterMedidor.vue'
import ShowInvoice from '@/views/ShowInvoice.vue'
import Editargateway from '@/views/Editargateway.vue'
import Detalles from '@/views/Detalles.vue'
import Detallesgateways from '@/views/Detallesgateways.vue'
import Editarmedidor from '@/views/Editarmedidor.vue'
import Usuarios from '@/views/Añadirusuario.vue'
import EditarUsuario from '@/views/Editarusuario.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegistroView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  //la rutas del administrador
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,

  },
  {
    path: '/consumo',
    name: 'consumo',
    component: ConsumoView,
    meta: { requiresAuth: true}
  },
  {
    path: '/add-gateway',
    name: 'Añadirgateway',
    component: GatewayView,
    meta: { requiresAuth: true }
  },
  {
    path: '/mapa',
    name: 'mapa',
    component: MapaView,
    meta:  { requiresAuth:true }
  },
  {
    path: '/add-medidor',
    name: 'RegistrarMedidor',
    component: MedidorView,
    meta:  { requiresAuth:true }
  },
  {
    path: '/show-invoice/:userId',
    name: 'ShowInvoice',
    component: ShowInvoice,
    props: true,
  },
  {
    path: '/edit-gateway/',
    name: 'Editargateway',
    component: Editargateway,
    meta: { requiresAuth: true }
  },
  {
    path: '/info-medidor/',
    name: 'Detalles',
    component: Detalles,
    meta: { requiresAuth: true }
  },
  {
    path: '/detalle-gateway/',
    name: 'Detallesgateways',
    component: Detallesgateways,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-medidor/',
    name: 'Editarmedidor',
    component: Editarmedidor,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-usuario',
    name: 'Añadirusuario',
    component: Usuarios,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-usuario',
    name: 'Editarusuario',
    component: EditarUsuario,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Añade un guardia de navegación para proteger las rutas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    next('/login'); 
  } else {
    next(); 
  }
});
export default router
