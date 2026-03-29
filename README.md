# 🐱 Retro Tamagotchi: Clean Architecture & SOLID Edition

¡Bienvenido al Tamagotchi más sólido de la web! Este proyecto no es solo un simulador de mascotas, es una pieza de ingeniería de software diseñada para ser mantenible, escalable y visualmente coherente.

## 🚀 Tecnologías
- **Motor de Juego:** [Phaser 3](https://phaser.io/)
- **Interfaz de Usuario:** [React 18](https://reactjs.org/)
- **Bundler:** [Vite 6](https://vitejs.dev/) (Última versión)
- **Fuente:** [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
- **Arquitectura:** Clean Architecture + SOLID Principles

## 🏗️ Arquitectura del Proyecto
El proyecto ha sido refactorizado desde un código altamente acoplado hacia una estructura de capas:

- **Core (Dominio):** Contiene las `Entities` (la lógica pura del gato) y los `Use Cases` (acciones orquestadas como alimentar o jugar). Es agnóstico de Phaser y React.
- **Infrastructure:** Detalles de implementación como el `LocalStoragePetRepository` y los adaptadores de animación de Phaser.
- **Adapters:** El `PetController` actúa como puente, permitiendo que React y Phaser se comuniquen sin conocerse directamente.
- **UI:** Una interfaz responsiva diseñada con una paleta "Madera & Crema" que se adapta a dispositivos móviles y desktop.

## 🎮 Características
- **Lógica Líquida:** El juego usa `Scale.RESIZE` para ocupar todo el espacio disponible.
- **Posicionamiento Dinámico:** El gato y el fondo se centran automáticamente mediante cálculos de cámara, evitando coordenadas fijas.
- **Persistencia Desacoplada:** El estado se guarda automáticamente en el navegador, pero la lógica de negocio no sabe que el `localStorage` existe.
- **Sistema de Eventos:** Comunicación limpia mediante un `EventBus` centralizado.

## 🛠️ Instalación y Ejecución
1. Instalar dependencias: `npm install`
2. Ejecutar en desarrollo: `npm run dev -- --force` (el flag `--force` asegura limpiar cualquier residuo de cache).
3. Abrir en: `http://localhost:5173`

---
*Desarrollado con ❤️ y mucha disciplina arquitectónica.*
