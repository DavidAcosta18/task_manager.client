# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# 🚀 TaskFlow: Plataforma de Gestión de Proyectos Ágil

## 📋 Descripción del Proyecto

**TaskFlow** es una plataforma de gestión de tareas y proyectos, diseñada para equipos pequeños a medianos que buscan una herramienta sencilla y visual para organizar su trabajo. La aplicación permite a los usuarios:

- Crear y gestionar proyectos con fechas de inicio y fin.
- Visualizar tareas en un **Tablero Kanban** con estados personalizables ("To Do", "In Progress", "Completed").
- Asignar tareas a miembros del equipo.
- Ver detalles de la tarea, incluyendo un _feed_ de comentarios.
- Mantener un registro de los usuarios del sistema.

El objetivo principal es proporcionar una experiencia de usuario fluida y reactiva mediante una arquitectura moderna de microservicios o monolito modular.

---

## ⚙️ Tecnologías Utilizadas

Este proyecto está construido con una arquitectura **Full-Stack** que utiliza las siguientes tecnologías y versiones principales:

| Componente      | Tecnología                   | Versión Clave |
| :-------------- | :--------------------------- | :------------ |
| **Frontend**    | React / TypeScript           | 18.2.0        |
| **Frontend UI** | Ant Design (Antd)            | 5.x           |
| **Estilos**     | Tailwind CSS                 | 3.4.0         |
| **State/Data**  | React Query (TanStack Query) | 5.x           |

---

## ✅ Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

- **Node.js:** Versión `v18.x` o superior.
- **yarn:** Versión `8.x` o superior.

---

## 🛠️ Instrucciones de Instalación Paso a Paso

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/DavidAcosta18/task_manager.client](https://github.com/DavidAcosta18/task_manager.client) TaskFlow
git checkout develop
cd TaskFlow
yarn
 ##Crear archivo .env y Añadir variables de entorno
yarn dev
```

## Datos .env

VITE_PUBLIC_API=http://localhost:4000

Decisión Técnica,Razón e Impacto
Se eligió para gestionar el estado del servidor (isLoading, caching, retries y sincronización de datos). Esto simplifica enormemente la lógica de la capa de datos en los componentes, ya que React Query maneja automáticamente la invalidación de caché (ej. actualizar la lista de proyectos tras una creación exitosa) y evita el prop drilling de estados de carga y error.

Se optó por un panel lateral (Drawer) en lugar de un modal centrado para la vista de detalles de las tareas y comentarios. Esto mejora la UX permitiendo al usuario mantener el contexto visual del Tablero Kanban detrás del panel de detalles, facilitando la referencia visual de dónde se encuentra la tarea.

Se usó Tailwind para construir utilidades y personalizaciones de bajo nivel, complementando a Ant Design. Esto garantiza que el proyecto tenga una apariencia moderna y consistente sin depender únicamente del diseño predefinido de Antd.
