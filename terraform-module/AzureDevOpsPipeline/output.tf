output "PublicIPAddress_LinuxVM" {
    value = azurerm_linux_virtual_machine.AzurePipelineVM.public_ip_address
}

output "PrivateIPAddress_LinuxVM" {
    value = azurerm_linux_virtual_machine.AzurePipelineVM.private_ip_address
}