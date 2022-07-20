variable "bucket_name" {
  description = "globally unique name of the bucket"
  type = string
}

variable "dist_path" {
  description = "from the root of the project, the path to where your static assets have been built"
  type = string
}