locals {
  pages_hostname = "${var.pages_subdomain}.${var.domain}"
}

# Authoritative zone in Cloudflare for the apex domain. After apply, take the
# nameservers from the `nameservers` output and update them at the registrar
# to complete the migration off Google Cloud DNS.
resource "cloudflare_zone" "avellone" {
  account_id = var.cloudflare_account_id
  zone       = var.domain
  plan       = "free"
  type       = "full"
}

# Pages project. The GitHub OAuth connection between Cloudflare and GitHub is
# a one-time dashboard step (Workers & Pages -> Create -> Pages -> Connect to
# Git). Once the OAuth is in place, this resource binds build config to the
# repo and produces the *.pages.dev URL.
resource "cloudflare_pages_project" "portfolio" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = var.production_branch

  source {
    type = "github"
    config {
      owner                         = var.git_owner
      repo_name                     = var.git_repo
      production_branch             = var.production_branch
      pr_comments_enabled           = false
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "all"
      preview_branch_includes       = ["*"]
      preview_branch_excludes       = [var.production_branch]
    }
  }

  build_config {
    build_command   = "pnpm run build"
    destination_dir = "dist"
    root_dir        = ""
  }

  # PNPM_VERSION makes Cloudflare Pages' build image pull pnpm before running
  # the build command. The packageManager field in package.json also covers
  # this via corepack, but pinning explicitly here belt-and-suspenders it.
  deployment_configs {
    production {
      environment_variables = {
        NODE_VERSION = "22"
        PNPM_VERSION = "10.32.1"
      }
    }
    preview {
      environment_variables = {
        NODE_VERSION = "22"
        PNPM_VERSION = "10.32.1"
      }
    }
  }
}

# Custom-domain binding so ben.avell.one resolves to the Pages project.
resource "cloudflare_pages_domain" "ben_subdomain" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.portfolio.name
  domain       = local.pages_hostname
}

# DNS record fronting the Pages site. Proxied so we get edge caching and
# automatic HTTPS via Cloudflare's managed certs.
resource "cloudflare_record" "ben_subdomain" {
  zone_id = cloudflare_zone.avellone.id
  name    = var.pages_subdomain
  type    = "CNAME"
  content = "${cloudflare_pages_project.portfolio.name}.pages.dev"
  proxied = true
  ttl     = 1 # 1 == Auto, required when proxied.

  comment = "Routes ${local.pages_hostname} to the Cloudflare Pages project."
}

# Cloudflare Web Analytics is intentionally NOT managed here. The v4 provider's
# cloudflare_web_analytics_site resource can create a site but cannot read it
# back (terraform-provider-cloudflare#3234, closed "not planned") -- create
# succeeds, then every plan/import fails. The site is a one-time create with no
# ongoing config surface, so it lives outside Terraform: created once with
# zone_tag = this zone + auto_install, edge-injects the RUM beacon on the
# proxied hostname. See ../docs/follow-ups.md "Analytics / privacy posture".
