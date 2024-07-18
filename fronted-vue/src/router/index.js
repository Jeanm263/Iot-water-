import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistroView from '@/views/RegistreView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ConsumoView from '@/views/ConsumoView.vue'
import GatewayView from '@/views/GatewayView.vue'
import MapaView from '@/views/MapaView.vue'
import MedidorView from '@/views/MedidorView.vue'



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
  // todo la rutas del administrador
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/consumo',
    name: 'consumo',
    component: ConsumoView,
    meta: { requiresAuth: true}
  },
  {
    path: '/gateway',
    name: 'gateway',
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
    path: '/medidor',
    name: 'medidor',
    component: MedidorView,
    meta:  { requiresAuth:true }
  }
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
