#!/usr/bin/env python3
"""
Test script para validar la funcionalidad del analizador de commits.
"""

import pandas as pd
import os
from analyze_commit import generate_excel_report, COMMIT_DATA

def test_excel_generation():
    """Prueba que el archivo Excel se genere correctamente."""
    print("🧪 Ejecutando pruebas del analizador de commits...")
    
    # Generar archivo Excel
    filename = generate_excel_report()
    
    # Verificar que el archivo existe
    assert os.path.exists(filename), f"El archivo {filename} no fue creado"
    print("✅ Archivo Excel creado exitosamente")
    
    # Leer y validar contenido
    df = pd.read_excel(filename)
    
    # Verificar columnas
    expected_columns = [
        'Archivo afectado',
        'Línea(s) modificadas', 
        'Descripción del problema',
        'Propuesta de solución'
    ]
    assert list(df.columns) == expected_columns, f"Columnas incorrectas: {list(df.columns)}"
    print("✅ Columnas del Excel son correctas")
    
    # Verificar que hay datos
    assert len(df) > 0, "El DataFrame está vacío"
    print(f"✅ Se identificaron {len(df)} problemas potenciales")
    
    # Verificar que no incluye package-lock.json
    package_lock_issues = df[df['Archivo afectado'] == 'package-lock.json']
    assert len(package_lock_issues) == 0, "No debería incluir análisis de package-lock.json"
    print("✅ package-lock.json excluido correctamente")
    
    # Verificar que incluye archivos esperados
    expected_files = ['index.html', 'package.json', 'script.js', 'vite.config.js']
    analyzed_files = df['Archivo afectado'].unique()
    for expected_file in expected_files:
        assert expected_file in analyzed_files, f"Falta análisis del archivo {expected_file}"
    print(f"✅ Archivos analizados: {list(analyzed_files)}")
    
    # Verificar que todas las filas tienen datos
    for col in df.columns:
        empty_cells = df[col].isna().sum()
        assert empty_cells == 0, f"Hay {empty_cells} celdas vacías en la columna {col}"
    print("✅ No hay celdas vacías en el DataFrame")
    
    print(f"\n📊 Resumen del análisis:")
    print(f"   Commit: {COMMIT_DATA['sha'][:8]}")
    print(f"   Mensaje: {COMMIT_DATA['message']}")
    print(f"   Archivos analizados: {len(analyzed_files)}")
    print(f"   Problemas identificados: {len(df)}")
    
    # Mostrar distribución por archivo
    print(f"\n📈 Problemas por archivo:")
    file_counts = df['Archivo afectado'].value_counts()
    for file, count in file_counts.items():
        print(f"   {file}: {count} problemas")
    
    return filename

if __name__ == '__main__':
    try:
        generated_file = test_excel_generation()
        print(f"\n🎉 Todas las pruebas pasaron exitosamente!")
        print(f"📁 Archivo generado: {generated_file}")
    except AssertionError as e:
        print(f"\n❌ Error en las pruebas: {e}")
        exit(1)
    except Exception as e:
        print(f"\n💥 Error inesperado: {e}")
        exit(1)