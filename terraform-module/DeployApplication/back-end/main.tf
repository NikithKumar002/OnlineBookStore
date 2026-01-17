resource "azurerm_resource_group" "ThreeTier_RG" {
    name = var.RGName
    location = var.location
    tags = merge(var.tags)
}

resource "azurerm_virtual_network" "ThreeTier_VNet" {
    depends_on = [ 
        azurerm_resource_group.ThreeTier_RG 
    ]
    name = "ThreeTierApplication_VNet"
    address_space = ["10.0.0.0/16"]
    location = azurerm_resource_group.ThreeTier_RG.location
    resource_group_name = azurerm_resource_group.ThreeTier_RG.name
    tags = merge(var.tags)
}

resource "azurerm_subnet" "ThreeTier_public_subnet" {
    depends_on = [ 
        azurerm_virtual_network.ThreeTier_VNet 
    ]
    name = "ThreeTier_Public_Subnet"
    resource_group_name = azurerm_resource_group.ThreeTier_RG.name
    virtual_network_name = azurerm_virtual_network.ThreeTier_VNet.name
    address_prefixes = ["10.0.1.0/24"]    
}

resource "azurerm_subnet" "ThreeTier_private_subnet" {
    depends_on = [ 
        azurerm_virtual_network.ThreeTier_VNet 
    ]
    name = "ThreeTier_Private_Subnet"
    resource_group_name = azurerm_resource_group.ThreeTier_RG.name
    virtual_network_name = azurerm_virtual_network.ThreeTier_VNet.name
    address_prefixes = ["10.0.2.0/24"]
    default_outbound_access_enabled = false
}

resource "azurerm_network_security_group" "Backend_NSG" {
    name = "Backend-NSG"
    location = azurerm_resource_group.ThreeTier_RG.location
    resource_group_name = azurerm_resource_group.ThreeTier_RG.name
    security_rule {
        name = "Allow-SSH"
        priority = 100
        direction = "Inbound"
        access = "Allow"
        protocol = "Tcp"
        source_address_prefix = "0.0.0.0/0"
        destination_address_prefix = "*"
        source_port_range = "*"
        destination_port_range = 22
    }
    security_rule {
        name = "Allow-HTTP"
        priority = 101
        direction = "Inbound"
        access = "Allow"
        protocol = "Tcp"
        source_address_prefix = "0.0.0.0/0"
        source_port_range = "*"
        destination_address_prefix = "${azurerm_network_interface.Backend_NIC.private_ip_address}"
        destination_port_range = 80
    }
}

resource "azurerm_public_ip" "AzurePipelineVM_PublicIP" {
    name                = "AzurePipelineVM_PublicIP"
    resource_group_name = azurerm_resource_group.ThreeTier_RG.name
    location            = azurerm_resource_group.ThreeTier_RG.location
    allocation_method   = "Static"
    sku                 = "Standard"
    tags                = var.tags
}

resource "azurerm_network_interface" "Backend_NIC" {
    depends_on = [ 
        azurerm_subnet.ThreeTier_private_subnet 
    ]
    name = "Backend-NIC"
    location = azurerm_resource_group.ThreeTier_RG.location
    resource_group_name = azurerm_resource_group.ThreeTier_RG.name
    
    ip_configuration {
        name = "Backend-IpConfig"
        subnet_id = "${azurerm_subnet.ThreeTier_private_subnet.id}"
        private_ip_address_allocation = "Static"
        private_ip_address = "10.0.2.5"
        public_ip_address_id = azurerm_public_ip.AzurePipelineVM_PublicIP.id
    }
}

resource "azurerm_network_interface_security_group_association" "Backend_NSG_Association" {
    depends_on = [ 
        azurerm_network_interface.Backend_NIC, 
        azurerm_network_security_group.Backend_NSG 
    ]
    network_security_group_id = azurerm_network_security_group.Backend_NSG.id
    network_interface_id = azurerm_network_interface.Backend_NIC.id   
}

resource "azurerm_linux_virtual_machine" "Backend_VM" {
    depends_on = [ 
        azurerm_network_interface.Backend_NIC, 
        azurerm_virtual_network.ThreeTier_VNet 
    ]
    name = "Backend-VM"
    resource_group_name = azurerm_resource_group.ThreeTier_RG.name
    location = azurerm_resource_group.ThreeTier_RG.location
    size                  = "Standard_D2s_v3"
    network_interface_ids = [azurerm_network_interface.Backend_NIC.id]
    admin_username = var.admin_username
    admin_password = var.admin_password
    disable_password_authentication = false

    os_disk {
        caching = "ReadWrite"
        storage_account_type = "Standard_LRS"
        disk_size_gb = 30
    }

    source_image_reference {
        publisher = "Canonical"
        offer     = "0001-com-ubuntu-server-jammy"
        sku       = "22_04-lts-gen2"
        version   = "latest"
    }

    
    identity {
        type = "SystemAssigned"
    }

    provisioner "file" {
        source = "templates"
        destination = "/home/${var.admin_username}/"
        connection {
          type = "ssh"
          user = var.admin_username
          password = var.admin_password
          host = self.public_ip_address
        }
    }

    tags = merge({
        name = "BackendServer"
        os_type = "Linux"
    }, var.tags)
}

data "azurerm_container_registry" "getACR" {
    name = "myonlinebookstore"
    resource_group_name = var.ACR_resourceGroup
}

resource "azurerm_role_assignment" "Backend_VM_ACR_Pull" {
    depends_on = [
        azurerm_linux_virtual_machine.Backend_VM
    ]

    scope                = data.azurerm_container_registry.getACR.id
    role_definition_name = "AcrPull"
    principal_id = azurerm_linux_virtual_machine.Backend_VM.identity[0].principal_id
}

resource "null_resource" "run_docker_compose_backend" {
    depends_on = [
        azurerm_linux_virtual_machine.Backend_VM,
        azurerm_role_assignment.Backend_VM_ACR_Pull
    ]

    provisioner "remote-exec" {
        connection {
          type = "ssh"
          user = var.admin_username
          password = var.admin_password
          host = azurerm_linux_virtual_machine.Backend_VM.public_ip_address
        }
        inline = [
            "chmod +x /home/${var.admin_username}/templates/pre-exec.sh",
            "sudo /home/${var.admin_username}/templates/pre-exec.sh ${data.azurerm_container_registry.getACR.login_server} ${var.admin_username}"
        ]
    }
}

