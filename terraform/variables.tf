# ---------------------------------------------------------------------------
# Terraform – Variables de configuración.
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
  description = "Tipo de instancia EC2."
  type        = string
  default     = "t3.micro"
}

variable "app_port" {
  description = "Puerto HTTP en el que escucha la aplicación NestJS."
  type        = number
  default     = 3000
}

variable "ecr_repository_name" {
  description = "Nombre del repositorio ECR donde se publica la imagen Docker."
  type        = string
  default     = "monos-phoenix-back"
}
