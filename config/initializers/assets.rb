# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.precompile += %w( main.css )
Rails.application.config.assets.precompile += %w( style.css )
Rails.application.config.assets.precompile += %w( bootstrap.css )
Rails.application.config.assets.precompile += %w( roshome.js )
Rails.application.config.assets.precompile += %w( roslib.js )
Rails.application.config.assets.precompile += %w( ColladaLoader2.js )
Rails.application.config.assets.precompile += %w( display.js )
Rails.application.config.assets.precompile += %w( jquery.js )
Rails.application.config.assets.precompile += %w( eventemitter2.js )
Rails.application.config.assets.precompile += %w( keyboardteleop.js )
Rails.application.config.assets.precompile += %w( Teleop.js )
Rails.application.config.assets.precompile += %w( easeljs.min.js )
Rails.application.config.assets.precompile += %w( eventemitter2.min.js )
Rails.application.config.assets.precompile += %w( roslib.min.js )
Rails.application.config.assets.precompile += %w( ros2d.js )
Rails.application.config.assets.precompile += %w( nav2d.js )
Rails.application.config.assets.precompile += %w( roslib.js )
Rails.application.config.assets.precompile += %w( jquery.imagePointer.js )
Rails.application.config.assets.precompile += %w( checkpoint.js )
# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Rails.application.config.assets.precompile += %w( map_marker.js )
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
