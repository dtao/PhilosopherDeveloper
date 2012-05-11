##
# Setup global project settings for your apps. These settings are inherited by every subapp. You can
# override these settings in the subapps as needed.
#
Padrino.configure_apps do
  # enable :sessions
  set :session_secret, '92777121559058e07e83618db91b09a23f96e7584c0abaa26fe5be09a2799e55'
end

# Mounts the core application for this project
Padrino.mount("Blog").to('/')
