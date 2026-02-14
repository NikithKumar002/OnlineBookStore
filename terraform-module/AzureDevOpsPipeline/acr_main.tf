resource "random_string" "acr_suffix" {
  length  = 6
  upper   = false
  special = false
}

resource "azurerm_container_registry" "my_acr" {
    name = "myonlinebookstore"
    resource_group_name = azurerm_resource_group.AzurePipelineRG.name
    location = azurerm_resource_group.AzurePipelineRG.location
    sku = "Basic"
    admin_enabled = true
    tags = merge(var.common_tags, {
        purpose = "AzureDevOpsPipeline"
    })
}