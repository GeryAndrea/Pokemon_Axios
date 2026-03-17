# 📚 Centro de Aprendizaje de Testing en Vue.js

Bienvenido. Aquí encontrarás todo lo que necesitas para dominar testing en Vue.js.

---

## 🗂️ DOCUMENTOS DISPONIBLES

### 1. **GUIA_TESTING.md** - Fundamentals
- ¿Qué es testing?
- Unit Tests con Jest
- Testing de componentes Vue
- Testing con Vuex
- Mock de APIs
- Testing E2E con Cypress
- Mejores prácticas
- Flujo TDD

**Comienza aquí si eres principiante** ✅

---

### 2. **EJEMPLOS_TESTING.md** - Casos Reales
Ejemplo práctico de tu proyecto:
- Ejemplo 1: TodoItem (unit test simple)
- Ejemplo 2: PokemonCard (test con props y eventos)
- Ejemplo 3: Buscador (TDD approach)
- Ejemplo 4: Mock de API
- Ejemplo 5: Cypress E2E

**Mira cómo funcionan los tests reales** 🔍

---

### 3. **EJERCICIOS_TESTING.md** - Práctica Gradual
Ejercicios progresivos:
- Nivel 1: Tests básicos de funciones
- Nivel 2: Tests de componentes simples
- Nivel 3: Componentes con props y eventos
- Nivel 4: Formularios e inputs
- Nivel 5: Mocks y async
- Nivel 6: Testing E2E

**Resuelve ejercicios para aprender haciendo** 💪

---

### 4. **COMANDOS_TESTING.md** - Reference Rápida
- Comandos de terminal
- Métodos de Vue Test Utils
- Métodos de Jest
- Métodos de Cypress
- Ejemplos rápidos
- Troubleshooting

**Guarda esta página como referencia** ⚡

---

## 🎯 RUTAS DE APRENDIZAJE

### 📍 Si eres **absolutamente principiante**
```
1. Lee GUIA_TESTING.md (conceptos básicos)
2. Resuelve EJERCICIOS_TESTING.md Nivel 1-2
3. Consulta COMANDOS_TESTING.md
4. Revisa EJEMPLOS_TESTING.md
```

### 📍 Si ya conoces **testing pero no Vue**
```
1. Lee GUIA_TESTING.md (secciones 3-6)
2. Resuelve EJERCICIOS_TESTING.md Nivel 3-4
3. Estudia EJEMPLOS_TESTING.md
```

### 📍 Si quieres **dominar completamente**
```
1. Lee toda la GUIA_TESTING.md
2. Resuelve TODOS los ejercicios en EJERCICIOS_TESTING.md
3. Copia ejemplos de EJEMPLOS_TESTING.md en tu código
4. Crea un mini-proyecto con >80% cobertura
```

---

## 🚀 COMANDOS RÁPIDOS

```bash
# Ejecutar tests
npm test

# Modo observador (se actualiza automáticamente)
npm run test:watch

# Ver cobertura
npm run test:coverage

# E2E Tests
npm run cypress:run

# Tests de un archivo específico
npm test -- src/components/TodoItem.spec.js
```

---

## 📊 TIPOS DE TESTS

| Tipo | Propósito | Herramienta | Velocidad |
|------|----------|-----------|-----------|
| **Unit** | Prueba funciones aisladas | Jest | ⚡ Rápido |
| **Component** | Prueba componentes Vue | Jest + Vue Test Utils | ⚡ Rápido |
| **Integration** | Prueba múltiples componentes | Jest + Vue Test Utils | ⏱️ Medio |
| **E2E** | Simula usuario real | Cypress | 🐢 Lento |

**Escribir tests en orden**: Unit → Component → E2E

---

## ✨ FLUJO TÍPICO

```
1. ESCRIBIR TEST (falla) ❌
   ↓
2. ESCRIBIR CÓDIGO MÍNIMO ✅ 
   ↓
3. REFACTORIZAR 🎨
   ↓
4. REPETIR ♻️
```

---

## 🎓 CONCEPTOS CLAVE

### Arrange, Act, Assert
```javascript
test('nombre del test', () => {
  // ARRANGE: Prepara datos
  const datos = { ... };
  
  // ACT: Ejecuta la acción
  const resultado = miFunction(datos);
  
  // ASSERT: Verifica
  expect(resultado).toBe(esperado);
});
```

### AAA Pattern en Vue
```javascript
test('componente hace algo', async () => {
  // ARRANGE
  const wrapper = mount(MiComponente);
  
  // ACT
  await wrapper.find('button').trigger('click');
  
  // ASSERT
  expect(wrapper.text()).toContain('algo');
});
```

---

## 🐛 TROUBLESHOOTING RÁPIDO

## Error: "cannot find module"
```bash
npm install
npm cache clean --force
```

## Error: "wrapper is undefined"
```javascript
// Asegúrate de usar mount()
const wrapper = mount(Componente);
```

## Error: "Expected to find element"
```javascript
// Usa timeout en Cypress
cy.get('button', { timeout: 10000 }).should('exist');
```

## Los tests son lentos
```bash
# Ejecuta solo un test
npm test -- --testNamePattern="nombre exacto"

# Salta un test temporalmente
test.skip('algo', () => {});
```

---

## 📈 NIVELES DE DOMINIO

### 🟢 Verde (Principiante)
- Entiendes qué es un test
- Puedes escribir un test simple
- Ejecutas `npm test`

### 🟡 Amarillo (Intermedio)
- Escribes tests para componentes
- Usas mocks básicos
- Entiendes E2E

### 🔴 Rojo (Avanzado)
- Implementas TDD correctamente
- Mocks complejos
- Cobertura >80%
- Tests como documentación

---

## 🎯 RECOMENDACIONES

### ✅ HACER
- Nombra tests claramente
- Prueba un comportamiento por test
- Usa `beforeEach` para setup
- Cubre casos edge (límites)
- Testa comportamiento, no implementación

### ❌ NO HACER
- No hagas tests demasiado genéricos
- No ignores los fallos de los tests
- No dejes "TODOs" sin resolver
- No mockees todo innecesariamente
- No omitas tests asincronos

---

## 📞 AYUDA RÁPIDA

Pregunta | Respuesta
---------|----------
¿Cómo test un input? | `input.setValue('texto')` luego verifica valor
¿Cómo test un evento? | `trigger('click')` luego verifica `emitted()`
¿Cómo test una API? | Mockea con `jest.mock('axios')`
¿Cómo test async? | Usa `async/await` y `jest.runAllTimers()`
¿Cómo test condicionales? | Monta con diferentes props, verifica renderizado

---

## 🏆 TU PRÓXIMO PASO

### ✍️ Después de terminar los ejercicios:

1. **Abre tu proyecto actual**
2. **Elige un componente sin tests**
3. **Escribe tests para él**
4. **Ejecuta los tests**
5. **Refactoriza el componente si es necesario**
6. **Repite con otro componente**

### 🎯 Meta: Alcanzar 80%+ de cobertura

```bash
npm run test:coverage
```

---

## 📚 RECURSOS EXTERNOS

- [Jest Official Docs](https://jestjs.io/)
- [Vue Test Utils Guide](https://test-utils.vuejs.org/)
- [Cypress Best Practices](https://docs.cypress.io/)
- [Testing Library](https://testing-library.com/)
- [Vue.js Testing Handbook](https://book.vuejs.org/guide/scaling-up/testing.html)

---

## 💡 TIPS DE PRO

### 1. Usa `test.only()` durante desarrollo
```javascript
test.only('este es el único que corre', () => {});
test('esto se salta', () => {});
```

### 2. Factory functions para datos de test
```javascript
function crearUsuario(overrides = {}) {
  return { id: 1, name: 'Juan', ...overrides };
}
```

### 3. Agrupación con `describe` anidados
```javascript
describe('Usuario', () => {
  describe('cuando es admin', () => {
    test('puede editar otros usuarios');
  });
});
```

### 4. Debug breakpoints
```javascript
// En tu test
debugger;  // Se pausará aquí

// Ejecutar con
node --inspect-brk node_modules/.bin/jest
```

---

## ✅ CHECKLIST ANTES DE ENVIAR CÓDIGO

- [ ] Todos los tests pasan
- [ ] Cobertura >80% en archivos críticos
- [ ] Los tests son legibles (nombre claro)
- [ ] No hay `test.skip()` u `console.log()` 
- [ ] Los tests cubren casos edge (errores, vacío, etc)
- [ ] Documenté código complejo
- [ ] Ejecuté `npm run test:coverage`

---

## 📝 ESTRUCTURA RECOMENDADA

```
tu-proyecto/
├── src/
│   ├── components/
│   │   ├── ComponenteA.vue
│   │   ├── ComponenteA.spec.js      ← Test al lado del componente
│   │   ├── ComponenteB.vue
│   │   └── ComponenteB.spec.js
│   └── utils/
│       ├── helper.js
│       └── helper.test.js           ← O aquí si lo prefieres
├── cypress/
│   └── e2e/
│       ├── pagina1.cy.js
│       ├── pagina2.cy.js
│       └── flujo-completo.cy.js
├── jest.config.js
├── cypress.config.js
└── package.json
```

---

## 🎉 ¡FELICITACIONES!

Si llegaste hasta aquí, estás listo para:
✅ Escribir tests unitarios
✅ Testear componentes Vue
✅ Mockear APIs
✅ Escribir tests E2E
✅ Entender TDD
✅ Alcanzar alta cobertura

**¡Vuelve a estas guías cuando las necesites!** 📚

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Cuándo empiezo a escribir tests?**
R: Desde ahora mismo. Con cada componente nuevo.

**P: ¿100% cobertura es necesaria?**
R: No, 80-85% es realista. Enfócate en lógica crítica.

**P: ¿Qué test es el más importante?**
R: Tests que cubren flujos principales del usuario.

**P: ¿Testing ralentiza el desarrollo?**
R: Inicialmente sí. Pero después te ahorra debugging.

**P: ¿Por dónde empiezo si tengo proyecto sin tests?**
R: Empieza con componentes críticos. Avanza gradualmente.

---

**¡Buena suerte en tu camino de testing! 🚀**

Recuerda: El código sin tests es como conducir sin licencia. Posible... pero peligroso.

---

## 📞 CONTACTO / FEEDBACK

Si tienes preguntas o encuentras errores, siéntete libre de:
- Consultar la [documentación oficial](https://jestjs.io/)
- Buscar en Stack Overflow
- Revisar los ejemplos en este repositorio
- Romper cosas y aprender del error 😄

**¡Happy Testing! 🧪**
