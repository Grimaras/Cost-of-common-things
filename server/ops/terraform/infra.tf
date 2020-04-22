provider "aws" {
  region  = "us-east-1"
  version = "~> 2.51"
}

provider "local" {
  version = "~> 1.4"
}

resource "aws_vpc" "PFA_Server" {
  cidr_block = "192.168.0.0/16"
  instance_tenancy = "default"
  tags = {
    Name = "PFA_Server"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.PFA_Server.id

  tags = {
    Name = "PFA_Server"
  }
}

resource "aws_route_table" "route" {
  vpc_id = aws_vpc.PFA_Server.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "PFA_Server"
  }
}

resource "aws_subnet" "sub" {
  vpc_id = aws_vpc.PFA_Server.id
  cidr_block = "192.168.0.0/24"

  tags = {
    Name = "PFA_Server"
  }
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.sub.id
  route_table_id = aws_route_table.route.id
}

resource "aws_key_pair" "app_key_pair" {
  key_name   = "app-key"
  public_key = file("../.ssh/PFA_Server_aws.pub")
}

resource "aws_security_group" "allow_ssh" {
  vpc_id = aws_vpc.PFA_Server.id
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_http" {
  vpc_id = aws_vpc.PFA_Server.id
  name        = "allow_http"
  description = "Allow HTTP inbound traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_https" {
  vpc_id = aws_vpc.PFA_Server.id
  name        = "allow_https"
  description = "Allow https traffic"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_all_out" {
  vpc_id = aws_vpc.PFA_Server.id
  name        = "allow_all_out"
  description = "Allow all outbound traffic"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app" {
  depends_on    = [aws_internet_gateway.igw]
  subnet_id     = aws_subnet.sub.id
  ami           = "ami-04b9e92b5572fa0d1"
  key_name      = aws_key_pair.app_key_pair.key_name
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.allow_ssh.id, aws_security_group.allow_http.id]
  associate_public_ip_address = true

}

output "instance_ip_addr" {
  value = aws_instance.app.public_ip
}

resource "local_file" "ansible_inventory" {
  content = "[app]\n${aws_instance.app.public_ip} ansible_user=ubuntu ansible_ssh_private_key_file=tmpkey"

  file_permission = "644"
  filename = "../ansible/hosts"
}
