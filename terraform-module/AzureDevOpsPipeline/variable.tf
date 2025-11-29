
variable "resourceGroup" {
  default = "AzurePipelines"
  description = "Name of the Resource Group"
}
variable "admin_username" {
  default = "azureuser"
}
variable "admin_password" {
  default = "Minkankso2209"
}
variable "location" {
  default = "East US"
  description = "Provision the resources in the location."
}
variable "common_tags" {
  default = {
    createdBy = "Terraform",
    usingBy   = "AzurePipelines"
  }
  description = "CommonTags"
}