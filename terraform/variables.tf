# ---------------------------------------------------------------------------
# Terraform – Variables de configuración para EKS.
# ---------------------------------------------------------------------------

variable "aws_region" {
  description = "Región de AWS donde se despliega la infraestructura."
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Nombre del entorno (dev, staging, prod)."
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto, usado como prefijo en los recursos."
  type        = string
  default     = "monos-phoenix"
}

variable "instance_type" {
  description = "Tipo de instancia EC2 para los workers de EKS."
  type        = string
  default     = "t3.micro" # Forzado por AWS Free Tier
}

# ============================
# RDS Variables
# ============================
variable "db_name" {
  description = "Nombre de la base de datos PostgreSQL"
  type        = string
  default     = "phoenix_db"
}

variable "db_username" {
  description = "Usuario maestro de la base de datos"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "Contraseña maestra de la base de datos"
  type        = string
  sensitive   = true
  default     = "Phoenix12345!" # Sobrescribir vía variable de entorno en producción
}
