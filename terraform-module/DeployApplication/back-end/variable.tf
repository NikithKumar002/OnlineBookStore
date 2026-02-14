variable "RGName" {
    default = "ThreeTierApplication"
    description = "Name of the Resource Group for the Three Tier Application"
}

variable "location" {
    default = "East US"
    description = "Provision the Three Tier Apps resource in the location"
}

variable "ACR_resourceGroup" {
  default = "AzurePipelines"
  description = "Name of the Resource Group"
}

variable "tags" {
    default = {
        createdBy = "Terraform",
        project   = "ThreeTierApplication"
    }
    description = "Tags for the Three Tier Application resources"
}

variable "admin_username" {
    default = "azureuser"
    description = "Username for the SSH Login"
}

variable "admin_password" {
    default = "azureuser@123"
    description = "Password for the SSH login"
}

