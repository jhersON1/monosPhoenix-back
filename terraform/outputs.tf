# ---------------------------------------------------------------------------
# Terraform – Outputs: valores que se muestran al finalizar `terraform apply`.
# ---------------------------------------------------------------------------

output "ec2_instance_id" {
  description = "ID de la instancia EC2 (necesario para enviar comandos SSM)."
  value       = aws_instance.app.id
}

output "ec2_public_ip" {
  description = "IP pública fija (Elastic IP) de la VM. Accede a la app en: http://<ip>"
  value       = aws_eip.app.public_ip
}

output "ecr_registry" {
  description = "URI del registro ECR (para docker login)."
  value       = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com"
}
