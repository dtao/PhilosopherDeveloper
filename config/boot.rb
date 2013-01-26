# Define our constants
SINATRA_ENV  = ENV["RACK_ENV"] ||= "development" unless defined?(SINATRA_ENV)
SINATRA_ROOT = File.join(File.dirname(__FILE__), "..") unless defined?(SINATRA_ROOT)

# Load our dependencies
require "rubygems" unless defined?(Gem)
require "bundler/setup"
Bundler.require(:default, SINATRA_ENV)

$LOAD_PATH << File.join(SINATRA_ROOT, "lib")
