module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.setup.js"], // Adiciona o setup para definir TextEncoder
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mapeia arquivos CSS e SCSS para mocks
  },
};
