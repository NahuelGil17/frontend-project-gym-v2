# 🎯 **Guía: Configurar Permisos de Reportes en Organización**

## 📍 **Ubicación de los Permisos**

Para configurar los permisos de reportes, navega a:
```
Organizaciones → [Seleccionar Organización] → Pestaña "Permisos"
```

## 📊 **Nuevo Módulo: Reportes**

Ahora verás una nueva sección llamada **"Reportes"** con los siguientes permisos:

### 🔍 **Permisos Disponibles**

| Permiso | Icono | Descripción | Funcionalidad |
|---------|-------|-------------|---------------|
| **Visualizar** | 👁️ | Ver dashboard y métricas básicas | • Dashboard principal<br>• Gráficos de ocupación<br>• Métricas de rutinas<br>• KPIs básicos |
| **Exportar** | 📥 | Descargar reportes en Excel | • Exportar datos a Excel<br>• Reportes personalizados<br>• Filtros de fecha |
| **Avanzado** | 🎯 | Acceder a métricas financieras y analytics avanzados | • Ingresos detallados<br>• Proyecciones<br>• ARR/MRR<br>• Métricas financieras |

## 👥 **Configuraciones Recomendadas por Rol**

### 🔴 **SuperAdmin (Completo)**
```
✅ Visualizar
✅ Exportar  
✅ Avanzado
```
**Acceso:** Dashboard completo + Exportación + Métricas financieras

### 🟡 **Admin de Gimnasio (Operacional)**
```
✅ Visualizar
✅ Exportar
❌ Avanzado
```
**Acceso:** Dashboard completo + Exportación (sin datos financieros sensibles)

### 🟢 **Manager/Staff (Solo Lectura)**
```
✅ Visualizar
❌ Exportar
❌ Avanzado
```
**Acceso:** Solo visualización de métricas operacionales

### 🔵 **Cliente (Sin Acceso)**
```
❌ Visualizar
❌ Exportar
❌ Avanzado
```
**Acceso:** Ninguno (para reportes administrativos)

## 🔧 **Cómo Configurar**

### **Paso 1: Acceder a Permisos**
1. Ve a **Organizaciones**
2. Selecciona la organización
3. Haz clic en la pestaña **"Permisos"**

### **Paso 2: Localizar Módulo Reportes**
4. Busca la sección **"Reportes"** con icono 📊
5. Verás la descripción: *"Acceder a reportes y análisis de datos"*

### **Paso 3: Configurar Permisos**
6. **Checkbox individual**: Marca/desmarca permisos específicos
7. **Checkbox maestro**: Selecciona/deselecciona todos los permisos del módulo
8. **Guardar cambios**: Haz clic en "Guardar Cambios"

## 🎨 **Interfaz Visual**

```
┌─────────────────────────────────────────────────────┐
│ 📊 Reportes                              ☐ Todos    │
│ Acceder a reportes y análisis de datos              │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌─────────────────────┐  ┌─────────────────────┐    │
│ │ 👁️ Visualizar       │  │ 📥 Exportar         │    │
│ │ Ver dashboard       │  │ Descargar reportes  │    │
│ │ ☑️ Habilitado       │  │ ☑️ Habilitado       │    │
│ └─────────────────────┘  └─────────────────────┘    │
│                                                     │
│ ┌─────────────────────┐                             │
│ │ 🎯 Avanzado         │                             │
│ │ Métricas financieras│                             │
│ │ ☐ Deshabilitado     │                             │
│ └─────────────────────┘                             │
└─────────────────────────────────────────────────────┘
```

## ⚡ **Efectos Inmediatos**

Una vez guardados los cambios:

### ✅ **Con Permisos de Visualizar**
- Aparece "Reportes" en el menú lateral
- Acceso al dashboard de métricas
- Visualización de gráficos

### ✅ **Con Permisos de Exportar** 
- Botón "Exportar" visible en dashboard
- Diálogo de exportación funcional
- Descarga de archivos Excel

### ✅ **Con Permisos Avanzados**
- Sección financiera visible
- Métricas de ingresos disponibles
- Analytics detallados

### ❌ **Sin Permisos**
- "Reportes" no aparece en navegación
- Error 403 al intentar acceder directamente
- Botones de exportación ocultos

## 🔄 **Testeo de Configuración**

### **Verificar Configuración:**
1. **Guardar** los permisos
2. **Hacer logout** del usuario
3. **Hacer login** nuevamente  
4. **Verificar** que el menú "Reportes" aparezca/desaparezca
5. **Probar** acceso a funcionalidades específicas

### **Troubleshooting:**
- **No aparece Reportes en menú**: Verificar permiso "Visualizar"
- **Botón Exportar oculto**: Verificar permiso "Exportar"  
- **Error 403**: Verificar que el usuario tenga los permisos asignados
- **Cambios no reflejan**: Hacer logout/login para refrescar permisos

## 📝 **Notas Importantes**

⚠️ **Precauciones:**
- Los cambios requieren **logout/login** para aplicarse
- Los permisos son **acumulativos** (Avanzado incluye Visualizar)
- Sin "Visualizar" no se puede acceder a ningún reporte

✅ **Mejores Prácticas:**
- Asignar permisos según responsabilidades reales
- Revisar permisos periódicamente
- Documentar cambios en permisos críticos
- Usar principio de menor privilegio

---

🎯 **¡Los permisos de reportes ya están disponibles en el detalle de organización!**
📊 **Configura según las necesidades de cada rol y organización** 