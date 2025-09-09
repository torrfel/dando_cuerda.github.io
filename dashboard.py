import pandas as pd

# Datos de ejemplo
deliveriesData = [
    { "id": 1, "destino": "Cali", "destinatario": "Juan Pérez", "fecha": "2023-09-07", "emprendedor": "Emprendedor 1", "entregado": True, "registro": "#" },
    { "id": 2, "destino": "Cali", "destinatario": "María García", "fecha": "2023-09-07", "emprendedor": "Emprendedor 1", "entregado": True, "registro": "#" },
    { "id": 3, "destino": "Cali", "destinatario": "Carlos López", "fecha": "2023-09-06", "emprendedor": "Emprendedor 2", "entregado": True, "registro": "#" },
    { "id": 4, "destino": "Bogotá", "destinatario": "Ana Rodríguez", "fecha": "2023-09-06", "emprendedor": "Emprendedor 1", "entregado": True, "registro": "#" },
    { "id": 5, "destino": "Bogotá", "destinatario": "Pedro Martínez", "fecha": "2023-09-05", "emprendedor": "Emprendedor 3", "entregado": True, "registro": "#" },
    { "id": 6, "destino": "Medellín", "destinatario": "Laura Sánchez", "fecha": "2023-09-05", "emprendedor": "Emprendedor 2", "entregado": True, "registro": "#" },
    { "id": 7, "destino": "Medellín", "destinatario": "Jorge Díaz", "fecha": "2023-09-04", "emprendedor": "Emprendedor 1", "entregado": True, "registro": "#" },
    { "id": 8, "destino": "Barranquilla", "destinatario": "Sofía Ramírez", "fecha": "2023-09-04", "emprendedor": "Emprendedor 3", "entregado": True, "registro": "#" },
    { "id": 9, "destino": "Cartagena", "destinatario": "Diego González", "fecha": "2023-09-03", "emprendedor": "Emprendedor 2", "entregado": True, "registro": "#" },
    { "id": 10, "destino": "Cali", "destinatario": "Mónica Herrera", "fecha": "2023-09-03", "emprendedor": "Emprendedor 1", "entregado": True, "registro": "#" }
]

# Crear DataFrame
df = pd.DataFrame(deliveriesData)

df_filtrado = df[df['emprendedor'] == 'Emprendedor 1']
print(df_filtrado)
