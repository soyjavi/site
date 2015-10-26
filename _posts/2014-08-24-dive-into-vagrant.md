---
layout:     post
title:      "Dive into Vagrant"
date:       2014-08-24
categories: vagrant
cover:      vagrant.png
permalink:  /blog/dive-into-vagrant
---
There are problems that developers should face on typical scenarios. An example is the fact that you never develop in the exactly same environment in which your app runs in production. It happens too, that if you're working with other fellas in the same project, the common situation is to have slightly different environments. It's difficult to duplicate the same environment in all developer machines; [Vagrant](http://www.vagrantup.com) can help you to solve this problems.

### What is Vagrant

Vagrant helps you to set up and manage **virtual environments**, so you can run a small Linux distribution image (called a box) inside your operating system, and run an application and its dependencies easily inside of it. Then, you can package your configured machine and share with others, or just share your configuration files and replicate the same environment all across machines. Let's see a little terminology before we start:

- Box: a bundle containing your operating system image and metadata.
- Host &amp; Guest machine: host is one who starts Vagrant while guest is the virtualized one.
- Providers: software that handles the virtualization process (i.e. VirtualBox).
- VagrantFile: hold the definition of the machine (Ruby language).
- Shared folder: allows you to edit your files in the host while running in the guest.

Vagrant installation is quite easy since pre-built [binaries](http://www.vagrantup.com/downloads.html) are distributed for almost all systems. Before installing it, you should install the provider you want to use. I recommend you [Virtual Box](https://www.virtualbox.org/).

### Getting started

Once you have Vagrant and a provisioner installed, you can start playing with it. Let's try an example by typing `vagrant init` in a new empty folder. A `VagrantFile` will be created with a minimum configuration and a lot of comments documenting the available options. For this example, copy this configuration:

```ruby
Vagrant.configure(2) do |config|
  config.vm.box = "hashicorp/precise64"
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "private_network", ip: "33.33.33.10"
  config.ssh.forward_agent = true
  config.vm.synced_folder "apps", "/apps"
end
```

With the first option we are telling Vagrant that we want to use an Ubuntu Precise box to create the virtual machine, you can browse more boxes [here](https://vagrantcloud.com/discover/featured). Next, we are forwarding port 80 in the guest machine to 8080 in our host. Then, we are assigning an IP address to the guest machine so it can be named in our host and accessible by others in our local network. Finally, we are telling that we want to forward our host ssh agent and to sync a folder called `apps` to a folder named `/apps` in the guest.

The shared folder should exists when the machine is turned on, so create an empty folder named `apps` in the same location as the VagrantFile. Now you can run `vagrant up` and `vagrant ssh`. You'll find yourself inside a VM logued as *vagrant* user, no superuser password and a minimum installation of Ubuntu Precise. Now we can play with our machine. Let's install `nginx` as usual in an Ubuntu distro:

```bash
$ sudo apt-get update
$ sudo apt-get -y install nginx
$ sudo service nginx start
```

Now Ubuntu is running with nginx installed and listening for connections in port 80. Since we forwarded port 80 in guest to port 8080 in host, you can go to `http://localhost:8080` in your host's browser and check nginx welcome message!

### Basic Vagrant manage

There are a lot of options to manage Vagrant; we already saw `vagrant up` but let's see more. What is cool about Vagrant is that if we mess up everything, it's possible to destroy our machine and start again running `vagrant destroy` and `vagrant up`. That's perfect to create a sandbox for our experiments.

Other important option to point is `vagrant suspend`. When you finish your work, you will not need the machine running and using resources in your host. You can suspend the machine so no resources will be used and, when you want to continue working on it, you can just run `vagrant resume` and the image state will be restored. You can also turn completely off the machine with `vagrant halt`.

If you want to change your machine configuration during development you may be tempted to destroy and re-create your machine. Be aware that `vagrant reload` option will reconfigure your machine without destroying it and losing the state.

Other manage option widely used is `vagrant package`. You can run it and your machine will be packaged in a box file that can be shared with your teammates to replicate the same environment you had but… that's just like sharing a traditional modified OS image right? I think it's much better to write a configuration specifying what you want to install in the machine and share that configuration instead of the packaged machine. This is call provisioning and we can use multiple IT automation tools to do it. Those tools are called provisioners.

### Provisioners

The most basic provisioner is **Shell script**. If you need more provisioning power (probably you do) Vagrant has support for multiple IT automation tools such as [Chef](http://www.getchef.com/chef/), [Puppet](http://puppetlabs.com/), or [Ansible](http://www.ansible.com/home). To use a provisioner you just have to add [configuration](http://docs.vagrantup.com/v2/provisioning/index.html) to your `VagrantFile`.

It's convenient to mention here a tool that is moving mountains these days: [Docker](http://www.docker.io). It's an open-source project to easily create lightweight, portable, self-sufficient containers from any application. If you know about this tool, you shouldn't see it as a Vagrant "killer". In fact I think that combining both is a win since Vagrant 1.5 can integrate with Docker using it as a provisioner.  

Configuration through automation tools is a very wide topic, and each tool has its own documentation, so for teaching purposes we are going to check just an example with Shell. We will write a script to install `nginx` and let you do the rest with other tools. Add to the configuration block, inside the VagrantFile, this line:

```ruby
config.vm.provision "shell", path: "script.sh"
```

This is telling Vagrant that at the provisioning moment we want to use shell  to run `script.sh`. Let's, create that `script.sh` file in the same folder as your `VagrantFile` containing:

```bash
echo “Running installation of nginx”
sudo apt-get update
sudo apt-get -y install nginx
sudo service nginx start
```

Provisioning is made when `vagrant up` is run. In order to run only the provisioning tools you can use the command `vagrant provision`. Let's do it and you’ll see how the commands in the script are executed. The cool thing about this if that if we document all the pieces of software and its configuration through provision tools, we can destroy the machine and run Vagrant up, then we have everything ready to work. Try it out and go to `http://localhost:8080` in your host again, you'll see everything working again.

With powerful tools such as Chef, we can replicate our environment, or even recycle our scripts to use them in production and have the very same environment in production and development for testing purposes. Cool, isn't it?

### The Cloud

Recently, Vagrant 1.5 was released with new and great features. With this new version, Vagrant has a Cloud for sharing, discovering and creating Vagrant environments through boxes. Did you heard about [localtunnel](http://localtunnel.me/)? Well, now the cloud is giving you another cool feature: sharing your running environment with anyone connected to Internet. Pretty much the same that localtunnel does.

To use this feature, sign up in [Vagrant Cloud](https://vagrantcloud.com/) and then login through the command line with `vagrant login`. Then, with your machine running and nginx installed (just for demo purposes), run `vagrant share`. A random URL will be generated to share with anyone. Vagrant will search for HTTP servers listening in your machine and map them to the URL given. In our example case, since nginx is listening on port 80, any request made to the share url in port 80 is going to be redirected to port 80 inside your machine. This is a great feature to share your development work with others. You can check a video [demo here](http://vimeo.com/87525972).

But best thing is that you can even let others to connect to your machine using SSH! When you are running `vagrant share`, use `--ssh` flag. Vagrant will ask you for a password and give you instructions to connect to your machine from outside running `vagrant connect --ssh <random-name-given>`. View a [demo here](http://vimeo.com/87525810).

You can also run `vagrant connect <random-name-given>` without ssh option and vagrant will create a tiny virtual machine to handle routing between you and the remote Vagrant environment. When you run it, an IP address will be given. You can directly ssh to that IP and you'll be inside the machine. You have a [demo here](http://vimeo.com/87590529).

### Conclusion

Vagrant let you create development environments that are portable, lightweight and easy to use. You can share the environments using Vagrant Cloud or giving the configuration files with a provisioning system. You can now have your whole team working on the very same environment, even replicate your production environment too, deleting all the problems mentioned above! Here you have some links for further reading:

- [Vagrant: Up and Running](http://shop.oreilly.com/product/0636920026358.do) by Mitchell Hashimoto, creator of Vagrant.
- [Vagrant Cookbook](https://leanpub.com/vagrantcookbook) by Erika Heidi.
- [Vagrant Railscast](http://railscasts.com/episodes/292-virtual-machines-with-vagrant?view=asciicast) by Ryan Bates

Nice hacking time!
