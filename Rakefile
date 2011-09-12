require 'rake'

PROJECT_ROOT      = File.expand_path(File.dirname(__FILE__))

PLATFORMS = {
  :chrome => {
    :src_dir => File.join(PROJECT_ROOT, 'chrome'),
    :dist_dir => File.join(PROJECT_ROOT, 'dist/chrome'),
    :files => %w{
      chrome/manifest.json
      infinite_stellario.js
      infinite_stellario.css
      chrome/zepto.min.js
      images/icon-16.png
      images/icon-48.png
      images/icon-128.png
    }
  },
  :firefox => {
    :src_dir => File.join(PROJECT_ROOT, 'firefox'),
    :dist_dir => File.join(PROJECT_ROOT, 'dist/firefox'),
    :files => %w{
      infinite_stellario.js
      infinite_stellario.css
    }
  }
}

task :default => [:clean, :combine, :package]

desc "Clean the distribution directories."
task :clean do
  PLATFORMS.each do |name, platform|
    rm_rf platform[:dist_dir]
    mkdir platform[:dist_dir]
  end
end

desc "Combine the required files to create versions for distribution."
task :combine do
  PLATFORMS.each do |name, platform|
    platform[:files].each do |src|
      cp File.join(PROJECT_ROOT, src), File.join(platform[:dist_dir], File.basename(src))
    end
  end
end
