terraform {
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
            version = "4.36.0"
        }
    }
}
provider "azurerm" {
    features {}
    client_id       = var.CLIENT_ID
    client_secret   = var.CLIENT_SECRET
    tenant_id       = var.TENANT_ID
    subscription_id = var.SUBSCRIPTION_ID
}