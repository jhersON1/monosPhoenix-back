# ---------------------------------------------------------------------------
# Terraform – Outputs de EKS y ECR
# ---------------------------------------------------------------------------

output "cluster_name" {
  description = "Nombre del clúster de EKS (necesario para kubectl)."
  value       = aws_eks_cluster.main.name
}

output "cluster_endpoint" {
  description = "Endpoint de la API de Kubernetes."
  value       = aws_eks_cluster.main.endpoint
}

output "ecr_registry" {
  description = "URI del registro ECR (para docker login)."
  value       = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com"
}

output "rds_endpoint" {
  description = "Endpoint de la base de datos RDS PostgreSQL"
  value       = aws_db_instance.main.endpoint
}
