# monosPhoenix-back

Backend del proyecto monosPhoenix desarrollado con NestJS y TypeScript. El objetivo de esta API es soportar la gestión de clientes, productos y pedidos con reglas de negocio claras, validaciones y control de estados.

## Descripción general

Este proyecto está pensado como una base para un sistema de negocio modular, escalable y preparado para integrarse con una base de datos PostgreSQL. Actualmente se encuentra en una etapa inicial de scaffolding, pero la estructura está preparada para continuar con la implementación de los módulos requeridos.

## Requisitos funcionales

### 1. Módulo de Gestión de Clientes
- RF-01: El sistema debe permitir el registro de un cliente nuevo capturando los campos: nombre completo, email y teléfono.
- RF-02: El sistema debe validar que el email registrado sea único antes de guardar al cliente.
- RF-03: El sistema debe requerir que el nombre completo sea un campo obligatorio.
- RF-04: El sistema debe permitir la actualización de los datos del cliente.
- RF-05: El sistema debe implementar una baja lógica de cliente, cambiando su estado a `IsActive = false`.
- RF-06: El sistema debe listar y consultar clientes mediante su identificador único (GUID).

### 2. Módulo de Gestión de Productos
- RF-07: El sistema debe permitir el registro de productos con nombre, descripción, precio y stock inicial.
- RF-08: El sistema debe validar que el nombre sea obligatorio.
- RF-09: El sistema debe impedir precios menores o iguales a cero.
- RF-10: El sistema debe impedir stocks negativos.
- RF-11: El sistema debe permitir actualizar precio y stock de productos existentes.
- RF-12: El sistema debe permitir la desactivación de productos mediante baja lógica.

### 3. Módulo de Gestión de Pedidos
- RF-13: El sistema debe verificar que el cliente seleccionado exista y esté activo.
- RF-14: El sistema debe permitir la creación de un pedido asociando al menos un producto.
- RF-15: El sistema debe verificar stock disponible antes de confirmar el pedido.
- RF-16: El sistema debe validar que la cantidad solicitada sea mayor a cero.
- RF-17: El sistema debe calcular automáticamente el valor total del pedido.
- RF-18: El sistema debe permitir cambiar el estado del pedido entre `PENDING`, `CONFIRMED`, `DELIVERED` y `CANCELLED`.
- RF-19: El sistema debe permitir consultar pedidos por su identificador único.

## Stack y herramientas

### Tecnologías principales
- NestJS 11
- TypeScript 5.7
- PostgreSQL
- TypeORM
- pnpm
- Jest + Supertest
- ESLint + Prettier

### Herramientas de apoyo
- GitHub para control de versiones
- Jira para gestión de tareas
- AWS para despliegues futuros
- Terraform para infraestructura como código
- CircleCI para integración continua

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:
- Node.js 20 o superior
- pnpm
- PostgreSQL en ejecución
- Git

## Configuración del proyecto

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd monosPhoenix-back
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```

3. Crea un archivo `.env` a partir del ejemplo proporcionado:
   ```bash
   cp .env.example .env
   ```

4. Ajusta las variables de entorno con los datos de tu base de datos PostgreSQL:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=monosphoenix
   DB_USER=postgres
   DB_PASSWORD=postgres
   ```

5. Asegúrate de tener creada la base de datos en PostgreSQL antes de iniciar la aplicación.

## Ejecución del proyecto

### Modo desarrollo
```bash
pnpm start:dev
```

La aplicación quedará disponible en:
- http://localhost:3000

### Compilación para producción
```bash
pnpm build
```

### Ejecutar la versión compilada
```bash
pnpm start:prod
```

## Pruebas y calidad de código

### Ejecutar pruebas unitarias
```bash
pnpm test
```

### Ejecutar pruebas end-to-end
```bash
pnpm test:e2e
```

### Revisar estilo y formato
```bash
pnpm lint
pnpm format
```

## Estructura del proyecto

- `src/main.ts`: punto de entrada de la aplicación.
- `src/app.module.ts`: módulo principal de NestJS.
- `src/database/`: configuración y módulos relacionados con la base de datos.
- `src/products/`: ejemplo de módulo de productos.
- `test/`: pruebas end-to-end.

## Notas importantes

- El proyecto sigue una arquitectura basada en módulos para facilitar la escalabilidad.
- Se recomienda trabajar con bajas lógicas en lugar de eliminaciones físicas para datos sensibles.
- El estado actual del backend es un scaffold inicial; los módulos funcionales se irán implementando conforme avance el desarrollo.
