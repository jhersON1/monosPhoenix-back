# Estándares de desarrollo

## Flujo de ramas

Las ramas `main` y `develop` no deben modificarse directamente.

Toda actividad de Jira debe desarrollarse en una rama independiente creada desde `develop`.

Formato:

tipo/ID-JIRA-descripcion-corta

Tipos permitidos:

- feat: nueva funcionalidad.
- fix: corrección de errores.
- chore: configuración o mantenimiento.
- refactor: reorganización del código.
- test: pruebas.

Ejemplo:

- chore/ID-4-development-standards


Reglas:

- Usar minúsculas en la descripción.
- Separar palabras con guiones.
- Incluir siempre el identificador de Jira.

## Convención de commits

Formato:

tipo(ID-JIRA): descripción corta


Los commits deben:

- Explicar claramente el cambio realizado.
- Incluir el identificador de Jira.

## Flujo de Pull Requests

1. Actualizar la rama develop.
2. Crear una rama desde develop.
3. Desarrollar la actividad asignada.
4. Ejecutar lint, pruebas y compilación.
5. Realizar commits claros.
6. Subir la rama a GitHub.
7. Crear un Pull Request hacia develop.


Todo Pull Request debe incluir:

- Identificador y nombre de la tarea Jira.
- Resumen del trabajo realizado.


No se permite realizar push directo a main o develop.