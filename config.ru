# This file is used by Rack-based servers to start the application.
=begin
require 'rack/rewrite'

use Rack::Rewrite do
  rewrite %r{^(?!.*(api|\.)).*$}, '/index.html'
end
=end

require_relative 'config/environment'

run Rails.application
