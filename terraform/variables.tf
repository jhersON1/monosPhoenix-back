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
