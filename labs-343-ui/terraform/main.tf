provider "aws" {
  region = "us-west-2"
}

module "s3_webiste" {
  source = "./modules/s3-website"
  bucket_name = "cwan-planning-poker"
  dist_path = "dist"
}
