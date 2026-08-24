# FakeStore

Aplicación SPA de e-commerce desarrollada con Angular y [Fake Store API](https://fakestoreapi.com/). Incluye autenticación, catálogo de productos, filtros, búsqueda, detalles de producto y carrito persistente.

Aplicación desplegada en Vercel: [FakeStore en vivo](https://fake-store-eight-hazel.vercel.app)

## Stack tecnológico

- Angular 22 con standalone components
- TypeScript
- Signals para el estado reactivo
- RxJS y `HttpClient` para las peticiones HTTP
- Angular Router para la navegación y las rutas protegidas
- `ngx-owl-carousel-o` instalado para soporte de carruseles
- Fake Store API como fuente de productos y autenticación
- `localStorage` para persistir la sesión y el carrito (es bien sabido que esto no es método seguro pero no se tenía más alternativa)

## Funcionalidades

### Autenticación

- Inicio de sesión contra `POST /auth/login`.
- Registro mediante `POST /users`.
- Protección del área de dashboard mediante un guard funcional.
- Persistencia del token de acceso en `localStorage`.
- Restauración automática de la sesión al recargar la aplicación.
- Interceptor HTTP que envía el token como `Bearer` en las peticiones.
- Botón de logout que elimina el token y vuelve a la pantalla de login.

### Catálogo

- Consulta de todos los productos.
- Grid responsive de productos: tres columnas en pantallas grandes y una en móvil.
- Búsqueda parcial y sin distinción entre mayúsculas y minúsculas sobre el título, descripción y categoría.
- Filtro por una o varias categorías.
- Contador de unidades seleccionadas visible en el header.
- Enlace desde el nombre de cada producto hacia su página de detalles.

### Detalles de producto

La página de detalles muestra la imagen, identificador, nombre, categoría, descripción, precio y unidades actuales del producto en el carrito.

También incluye una sección `Related` con productos de la misma categoría. La vista está dividida en componentes independientes para el contenido principal y los productos relacionados.

### Carrito

- Permite agregar el mismo producto varias veces.
- Permite agregar una unidad, quitar una unidad o quitar todas las unidades de un producto.
- Muestra el precio unitario, las unidades, el total por producto y el total general.
- Deshabilita la acción de quitar cuando ya no quedan unidades del producto.
- Actualiza los contadores de forma reactiva.
- Persiste los productos en `localStorage` para conservarlos después de recargar la página.
- Incluye una acción para reiniciar completamente el carrito.

## Rutas principales

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/login` | Inicio de sesión y registro | Público |
| `/dashboard` | Catálogo de productos | Protegido |
| `/dashboard/product/:productId` | Detalles de un producto | Protegido |
| `/dashboard/carts` | Carrito de compras | Protegido |

## Estructura del proyecto

```text
src/
├── app/
│   ├── authLayout/              # Login y registro
│   ├── dashboardLayout/         # Layout, catálogo, carrito y detalles
│   │   ├── product-hero.ts      # Información principal del producto
│   │   ├── product-related.ts   # Productos relacionados
│   │   ├── products.detail.ts   # Coordinación de la página de detalles
|   |   ├── page.ts              # Página de productos principal
|   |   ├── layout.ts            # Componente contenedor de la navegación
|   |   ├── carts.ts             # Página para la administración del carrito
│   │   └── styles/              # Estilos del layout y sus componentes
│   ├── app.config.ts            # Providers globales
│   └── app.routes.ts            # Configuración de rutas
├── services/
│   ├── AuthService.ts           # Sesión y token
│   ├── CartService.ts           # Estado y persistencia del carrito
│   ├── ProviderService.ts       # Productos y filtros
│   ├── auth.guard.ts            # Protección de rutas
│   └── auth.interceptor.ts      # Token en peticiones HTTP
└── types/
    ├── Cart.ts
    ├── Product.ts
    └── Token.ts
```

## Requisitos

- Node.js compatible con Angular 22
- npm

## Credenciales de prueba

Puedes utilizar las siguientes credenciales de Fake Store API para iniciar sesión:

```text
Usuario: johnd
Contraseña: m38rmF$
```

## Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone <repository-url>
cd fake-store
```

Instala las dependencias:

```bash
npm install
```

## Ejecución

Inicia el servidor de desarrollo:

```bash
npm start
```

Abre `http://localhost:4200/` en el navegador. La aplicación se recarga automáticamente al modificar los archivos fuente.

## Build de producción

```bash
npm run build
```

Los artefactos compilados se generan en la carpeta `dist/`.

## API

La aplicación consume los siguientes recursos públicos de Fake Store API:

- `GET /products` para el catálogo.
- `GET /carts/1` para la consulta de carrito configurada en el provider.
- `POST /auth/login` para iniciar sesión.
- `POST /users` para registrar usuarios.

## Decisiones técnicas

- Signals centralizan el estado de toda propiedad asíncrona.
- El token y el carrito se restauran directamente desde `localStorage`.
- Los interceptores y guards usan las APIs funcionales de Angular.
- La página de detalles se divide en componentes `ProductHeroComponent` y `ProductRelatedComponent` para aislar los cambios de cada sección.
- El diseño responsive se implementa con CSS y media queries, sin una librería de UI.
