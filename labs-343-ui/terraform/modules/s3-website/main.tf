locals {
  path_to_root = "../"
}

resource "aws_s3_bucket" "default" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_acl" "default" {
  bucket = aws_s3_bucket.default.bucket
  acl = "public-read"
}

resource "aws_s3_bucket_website_configuration" "default" {
  bucket = aws_s3_bucket.default.bucket
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

module "template_files" {
  source = "hashicorp/dir/template"

  base_dir = "${local.path_to_root}${var.dist_path}"
}

resource "aws_s3_object" "angular-app" {
  for_each = module.template_files.files

  bucket = aws_s3_bucket.default.bucket
  key    = each.key
  source  = each.value.source_path
  content = each.value.content
  etag = each.value.digests.md5
  content_type = each.value.content_type
}

resource "aws_s3_bucket_policy" "prod_website" {
  bucket = aws_s3_bucket.default.bucket
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
      {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": [
             "s3:GetObject"
          ],
          "Resource": [
             "arn:aws:s3:::${aws_s3_bucket.default.id}/*"
          ]
      }
    ]
}
POLICY
}