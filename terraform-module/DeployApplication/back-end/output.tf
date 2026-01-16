output "PublicIP" {
    value = azurerm_linux_virtual_machine.Backend_VM.public_ip_address
}

output "PrivateIP" {
    value = azurerm_linux_virtual_machine.Backend_VM.private_ip_address
}

output "acr_loginserver" {
    value = data.azurerm_container_registry.getACR.login_server
}
