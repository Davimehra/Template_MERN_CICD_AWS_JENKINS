# Template_MERN_CICD_AWS_JENKINS
This Repository is an MERN CICD  TEMPLATE, It consists an automated CI and CD wrt Development Env, for Dev - Skaffold and For Production - Jenkins is used, Nodes are placed under AWS via KOPS

## Basic Requirements
* FILL Bash Env File
* Docker Account Credentials Configured (For dev)     , will be configured automaticaly to cluster Master Instance , via BashEnv
* aws credentials Configured (with Admin Permissions) , will be configured automaticaly to cluster Master Instance , via BashEnv
* Route 53 Configured for DNS (from your domainSite)  , Can't automate , do manual  Entries

* Skaffold installed (For dev)
* minikube installed (For dev)
* Helm     installed (For dev)                        , will be installed separately to cluster Master Instance
