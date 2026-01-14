# Create Resource group
resource "azurerm_resource_group" "AzurePipelineRG" {
    name     = var.resourceGroup
    location = var.location
    tags     = var.common_tags
}

# Create Virtual Network
resource "azurerm_virtual_network" "AzurePipelineVMVirtualNet1" {
    name                = "AzurePipelineVMVNet"
    location            = azurerm_resource_group.AzurePipelineRG.location
    resource_group_name = azurerm_resource_group.AzurePipelineRG.name
    address_space = ["10.0.0.0/24"]
}

# Create Subnet
resource "azurerm_subnet" "subnet1" {
    name                 = "Linux-Subnet"
    resource_group_name  = azurerm_resource_group.AzurePipelineRG.name
    virtual_network_name = azurerm_virtual_network.AzurePipelineVMVirtualNet1.name
    address_prefixes     = ["10.0.0.0/25"]
}

# Create public IP address
resource "azurerm_public_ip" "AzurePipelineVM_PublicIP" {
    name                = "AzurePipelineVM_PublicIP"
    resource_group_name = azurerm_resource_group.AzurePipelineRG.name
    location            = azurerm_resource_group.AzurePipelineRG.location
    allocation_method   = "Static"
    sku                 = "Standard"
    tags                = var.common_tags
}
# Create NIC for Azure Pipeline Linux VM
resource "azurerm_network_interface" "NIC_AzurePipelineVM" {
    name                = "NIC-AzurePipelineVM"
    resource_group_name = azurerm_resource_group.AzurePipelineRG.name
    location            = azurerm_resource_group.AzurePipelineRG.location
    ip_configuration {
        name                          = "AzurePipelineVM-IpConfig"
        subnet_id                     = azurerm_subnet.subnet1.id
        private_ip_address_allocation = "Dynamic"
        public_ip_address_id          = azurerm_public_ip.AzurePipelineVM_PublicIP.id 
    }
    tags                = var.common_tags
}

# Create Network Security Group to allow the port
resource "azurerm_network_security_group" "AzurePipelineNSG" {
    name                = "AzurePipelineVM-NSG"
    resource_group_name = azurerm_resource_group.AzurePipelineRG.name
    location            = azurerm_resource_group.AzurePipelineRG.location

    security_rule {
        name                       = "ssh"
        priority                   = 100
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        source_address_prefix      = "0.0.0.0/0"
        destination_port_range     = "22"
        destination_address_prefix = "*"
    }
}

# Associate the network security to the MySQL NIC
resource "azurerm_network_interface_security_group_association" "VM-NIC-NSG" {
    network_interface_id      = azurerm_network_interface.NIC_AzurePipelineVM.id
    network_security_group_id = azurerm_network_security_group.AzurePipelineNSG.id
}

# Create Linux VM 
resource "azurerm_linux_virtual_machine" "AzurePipelineVM" {
    name                  = "AzurePipelineVM"
    resource_group_name   = azurerm_resource_group.AzurePipelineRG.name
    location              = azurerm_resource_group.AzurePipelineRG.location
    network_interface_ids = [azurerm_network_interface.NIC_AzurePipelineVM.id]
    size                  = "Standard_D4s_v3"

    os_disk {
        caching              = "ReadWrite"
        storage_account_type = "Standard_LRS"
        disk_size_gb         = 100
    }
    source_image_reference {
        publisher = "Canonical"
        offer     = "0001-com-ubuntu-server-jammy"
        sku       = "22_04-lts-gen2"
        version   = "latest"
    }
    # source_image_id = "/CommunityGalleries/aksubuntu-38d80f77-467a-481f-a8d4-09b6d4220bd2/Images/2404containerd/latest"
    admin_username = var.admin_username
    admin_password = var.admin_password
    disable_password_authentication = false

    provisioner "remote-exec" {
        connection {
          type = "ssh"
          user = var.admin_username
          password = var.admin_password
          host = self.public_ip_address
        }
        inline = [
            "sudo apt-get update -y",
            "sudo apt-get install docker.io -y",
            "sudo systemctl start docker",
            "sudo systemctl enable docker",
            "sudo usermod -aG docker ${var.admin_username}"
        ]
    }

    tags           = var.common_tags
    depends_on = [
        azurerm_network_interface.NIC_AzurePipelineVM,
        azurerm_public_ip.AzurePipelineVM_PublicIP
    ]
}