# CS 260 Notes

I love web programming

This file represents what I have learned about web programming.

- [My startup](https://startup.cs260.click)
- [My simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

I learned that domain names can be an A record, which maps a domain name to an IP address, or a CNAME, which maps one domain name to another domain name. I can use this to, for example, register rentitbest.com and rentitbest.net, with the .com domain being linked to my website's IP and the .net being linked to the .com.

(AI)
Common Troubleshooting Steps for EC2 Status Checks:
- System Check Failed: This is usually an issue with the AWS hardware. The simplest fix is to Stop and Start the instance to migrate it to a healthy host.
- Instance Check Failed: This often indicates an issue with the Operating System (e.g., a corrupted file system or networking driver error).
- Check System Logs: Go to Actions > Monitor and troubleshoot > Get system log to see the boot console output. This often reveals exactly why the OS is stuck.

In Amazon Route 53, domain names are mapped to IP addresses using Resource Records. You have full control to change, redirect, or swap these mappings whenever you like. If I ever wish to map my site's IP to a different domain name I have registered, I can do that.

Forward Proxy vs. Reverse Proxy Table:

Feature             Forward Proxy               Reverse Proxy 
Placement           In front of clients         In front of servers 
Who it hides        The client                  The server 
Common use          Anonymity, filtering        Load balancing, protection 
Awareness           Client knows it's using it  Client is unaware 
Request direction   Client -> Proxy -> Server   Client -> Proxy -> Server

I can obtain, and renew, a web certificate by enabling the ACME protocol for your web server and communicating with Let's Encrypt to generate the needed certificates.

## HTML

Interesting things I have learned about HTML

## React

Interesting things I have learned about React
