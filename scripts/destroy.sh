#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# destroy.sh – Elimina TODA la infraestructura de AWS creada por Terraform.
#
# Uso:
#   ./scripts/destroy.sh
#
# Requisitos:
#   - Terraform instalado.
#   - Credenciales de AWS configuradas (aws configure o variables de entorno).
#
# ⚠️  Este script es irreversible. Eliminará la VM EC2, la VPC y todos los
#     recursos asociados. Ejecútalo cuando termines la demo o presentación
#     para evitar costos innecesarios.
# ---------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TF_DIR="${SCRIPT_DIR}/../terraform"

echo ""
echo "⚠️  ATENCIÓN: Esto eliminará TODA la infraestructura de AWS (EC2, VPC, etc.)."
echo "   Directorio Terraform: ${TF_DIR}"
echo ""

cd "${TF_DIR}"

# Inicializar Terraform si no se ha hecho antes.
if [ ! -d ".terraform" ]; then
  echo "📦 Inicializando Terraform..."
  terraform init
fi

echo "🗑️  Ejecutando terraform destroy..."
terraform destroy -auto-approve

echo ""
echo "✅ Toda la infraestructura ha sido destruida exitosamente."
echo "   No hay recursos generando costos en AWS."
echo ""
