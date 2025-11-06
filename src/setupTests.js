// importamos '@testing-library/jest-dom' para anadir "matchers" personalizados de jest-dom
// (como .toBeInTheDocument(), .toHaveTextContent(), etc.) a vitest.
// esto nos permite hacer aserciones mas legibles sobre el estado del dom.
// este archivo se carga automaticamente antes de cada prueba,
// segun lo definido en la propiedad 'setupFiles' de vite.config.js.
import '@testing-library/jest-dom';