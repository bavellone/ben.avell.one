output "nameservers" {
  description = "Authoritative nameservers Cloudflare assigned to the zone. Update these at the registrar (currently ns-cloud-d{1-4}.googledomains.com) to complete the DNS migration."
  value       = cloudflare_zone.avellone.name_servers
}

output "pages_custom_url" {
  description = "Live URL once the registrar nameserver flip has propagated."
  value       = "https://${cloudflare_pages_domain.ben_subdomain.domain}"
}

output "pages_default_url" {
  description = "Cloudflare's *.pages.dev URL. Always reachable regardless of DNS migration state -- useful for verifying the build before the cutover."
  value       = "https://${cloudflare_pages_project.portfolio.name}.pages.dev"
}
