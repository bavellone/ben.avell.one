variable "cloudflare_account_id" {
  description = "Cloudflare account ID that will own the zone and Pages project."
  type        = string
}

variable "domain" {
  description = "Apex domain to manage in Cloudflare DNS."
  type        = string
  default     = "avell.one"
}

variable "pages_subdomain" {
  description = "Subdomain the Pages site is served at (joined with var.domain)."
  type        = string
  default     = "ben"
}

variable "pages_project_name" {
  description = "Cloudflare Pages project name. Also defines the *.pages.dev hostname."
  type        = string
  default     = "ben-avellone-portfolio"
}

variable "git_owner" {
  description = "GitHub account owning the source repo."
  type        = string
  default     = "bavellone"
}

variable "git_repo" {
  description = "Repository name (without owner)."
  type        = string
  default     = "ben.avell.one"
}

variable "production_branch" {
  description = "Branch that publishes to the production custom domain."
  type        = string
  default     = "master"
}
