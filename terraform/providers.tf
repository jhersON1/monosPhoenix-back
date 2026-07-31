
terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend remoto en S3 para guardar el estado de Terraform.
  backend "s3" {
    bucket         = "monos-phoenix-tf-state"
    key            = "infra/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  # Terraform lee las credenciales de AWS automáticamente desde:
  #   1. Variables de entorno: AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY
  #   2. Archivo ~/.aws/credentials (generado por `aws configure`)
  # NO se escriben credenciales en este archivo.
}
