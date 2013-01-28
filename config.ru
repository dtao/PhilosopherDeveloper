#!/usr/bin/env rackup
# encoding: utf-8

require File.expand_path("../app.rb", __FILE__)

use Rack::CanonicalHost, "philosopherdeveloper.com" if ENV["RACK_ENV"] == "production"

run Sinatra::Application
